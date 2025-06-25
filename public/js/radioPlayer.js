
class RadioPlayerEngine {
  constructor() {
    this.isPlaying = false;
    this.currentTrack = '';
    this.progress = 0;
    this.jPlayer = null;
    this.currentStream = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializePlayer());
    } else {
      setTimeout(() => this.initializePlayer(), 100);
    }
  }

  initializePlayer() {
    console.log('Inicializando RadioPlayer com jPlayer...');
    
    // Conecta com elementos React via ID
    this.trackNameElement = document.getElementById('track-name');
    this.progressElement = document.getElementById('progress-bar');
    this.playButton = document.getElementById('play-button');
    
    // Verifica se jQuery está carregado
    if (typeof $ === 'undefined') {
      console.error('jQuery não encontrado! jPlayer precisa do jQuery.');
      setTimeout(() => this.initializePlayer(), 500);
      return;
    }

    // Cria elemento jPlayer se não existir
    if (!document.getElementById('jquery_jplayer_1')) {
      const jplayerDiv = document.createElement('div');
      jplayerDiv.id = 'jquery_jplayer_1';
      jplayerDiv.style.display = 'none';
      document.body.appendChild(jplayerDiv);
    }

    this.setupJPlayer();
  }

  setupJPlayer() {
    console.log('Configurando jPlayer...');
    
    this.jPlayer = $('#jquery_jplayer_1');
    
    this.jPlayer.jPlayer({
      ready: () => {
        console.log('jPlayer pronto!');
        // Carrega o stream padrão
        this.jPlayer.jPlayer('setMedia', {
          mp3: this.currentStream
        });
      },
      timeupdate: (event) => {
        if (event.jPlayer.status.duration) {
          const percent = (event.jPlayer.status.currentTime / event.jPlayer.status.duration) * 100;
          this.updateProgress(percent);
        }
      },
      ended: () => {
        this.isPlaying = false;
        this.updatePlayButton();
      },
      error: (event) => {
        console.error('Erro no jPlayer:', event.jPlayer.error);
      },
      swfPath: 'https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer',
      supplied: 'mp3, oga, wav',
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      remainingDuration: true,
      toggleDuration: true
    });
  }

  updateTrackName(name) {
    this.currentTrack = name;
    if (this.trackNameElement) {
      this.trackNameElement.textContent = name;
    }
    console.log('Track atualizada:', name);
  }

  updateProgress(percent) {
    this.progress = percent;
    if (this.progressElement) {
      this.progressElement.style.width = `${percent}%`;
    }
  }

  updatePlayButton() {
    if (this.playButton) {
      this.playButton.classList.toggle('playing', this.isPlaying);
    }
  }

  togglePlay() {
    if (!this.jPlayer) {
      console.error('jPlayer não inicializado');
      return;
    }

    this.isPlaying = !this.isPlaying;
    
    if (this.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
    
    this.updatePlayButton();
    console.log('Play/Pause toggled:', this.isPlaying);
  }

  play() {
    if (this.jPlayer) {
      this.jPlayer.jPlayer('play');
    }
  }

  pause() {
    if (this.jPlayer) {
      this.jPlayer.jPlayer('pause');
    }
  }

  // Função principal para inserir áudio (vinhetas, anúncios, etc)
  insertAudio(audioUrl, fadeTime = 1000) {
    console.log('Inserindo áudio:', audioUrl);
    
    if (!this.jPlayer) {
      console.error('jPlayer não inicializado');
      return;
    }

    // Valida se a URL é válida
    if (!audioUrl || typeof audioUrl !== 'string') {
      console.error('URL de áudio inválida:', audioUrl);
      return;
    }

    const originalStream = this.currentStream;
    
    // Fade out atual
    this.fadeOut(fadeTime).then(() => {
      // Salva se estava tocando
      const wasPlaying = this.isPlaying;
      
      // Para o áudio atual
      this.jPlayer.jPlayer('pause');
      
      // Carrega novo áudio
      this.jPlayer.jPlayer('setMedia', {
        mp3: audioUrl
      });
      
      // Toca o novo áudio
      this.jPlayer.jPlayer('play');
      
      // Quando terminar, volta ao original
      const checkEnded = () => {
        if (this.jPlayer.data('jPlayer').status.ended) {
          console.log('Áudio inserido terminou, voltando ao stream original');
          this.jPlayer.jPlayer('setMedia', {
            mp3: originalStream
          });
          
          if (wasPlaying) {
            this.jPlayer.jPlayer('play');
            this.fadeIn(fadeTime);
          }
        } else {
          setTimeout(checkEnded, 500);
        }
      };
      
      setTimeout(checkEnded, 1000);
      
    }).catch(e => {
      console.error('Erro na inserção de áudio:', e);
    });
  }

  fadeOut(duration = 1000) {
    return new Promise(resolve => {
      if (!this.jPlayer) {
        resolve();
        return;
      }

      const startVolume = this.jPlayer.jPlayer('option', 'volume');
      const fadeStep = startVolume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        const currentVolume = this.jPlayer.jPlayer('option', 'volume');
        if (currentVolume > fadeStep) {
          this.jPlayer.jPlayer('volume', currentVolume - fadeStep);
        } else {
          this.jPlayer.jPlayer('volume', 0);
          clearInterval(fadeInterval);
          resolve();
        }
      }, 50);
    });
  }

  fadeIn(duration = 1000) {
    return new Promise(resolve => {
      if (!this.jPlayer) {
        resolve();
        return;
      }

      this.jPlayer.jPlayer('volume', 0);
      const targetVolume = 0.7;
      const fadeStep = targetVolume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        const currentVolume = this.jPlayer.jPlayer('option', 'volume');
        if (currentVolume < targetVolume - fadeStep) {
          this.jPlayer.jPlayer('volume', currentVolume + fadeStep);
        } else {
          this.jPlayer.jPlayer('volume', targetVolume);
          clearInterval(fadeInterval);
          resolve();
        }
      }, 50);
    });
  }

  // Função para agendar inserções
  scheduleAudio(audioUrl, delayMs) {
    setTimeout(() => {
      this.insertAudio(audioUrl);
    }, delayMs);
  }
}

// Inicializar globalmente
if (typeof window !== 'undefined') {
  window.radioPlayer = new RadioPlayerEngine();

  // Funções globais para chamadas externas
  window.insertRadioAudio = (url) => {
    if (window.radioPlayer) {
      window.radioPlayer.insertAudio(url);
    }
  };

  window.updateRadioTrack = (name) => {
    if (window.radioPlayer) {
      window.radioPlayer.updateRadioTrack(name);
    }
  };

  window.scheduleRadioAudio = (url, delay) => {
    if (window.radioPlayer) {
      window.radioPlayer.scheduleAudio(url, delay);
    }
  };

  // Para debug - URLs de teste que funcionam
  window.testRadio = () => {
    console.log('Testando jPlayer...');
    window.updateRadioTrack('Música de Teste com jPlayer');
    setTimeout(() => {
      // URL de teste que funciona
      window.insertRadioAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    }, 3000);
  };

  // URLs de teste adicionais
  window.testUrls = {
    song1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    song2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    song3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    radio: 'http://ice.fabricahost.com.br/rafaelmouraradio'
  };
}
