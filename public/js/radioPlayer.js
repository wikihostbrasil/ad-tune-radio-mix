
class RadioPlayerEngine {
  constructor() {
    this.audioContext = null;
    this.currentAudio = null;
    this.isPlaying = false;
    this.currentTrack = '';
    this.progress = 0;
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializePlayer());
    } else {
      // DOM já está pronto
      setTimeout(() => this.initializePlayer(), 100);
    }
  }

  initializePlayer() {
    console.log('Inicializando RadioPlayer...');
    
    // Conecta com elementos React via ID
    this.audioElement = document.getElementById('radio-audio');
    this.trackNameElement = document.getElementById('track-name');
    this.progressElement = document.getElementById('progress-bar');
    this.playButton = document.getElementById('play-button');
    
    if (this.audioElement) {
      console.log('Player conectado com sucesso!');
      this.setupAudioEvents();
    } else {
      console.log('Elementos não encontrados, tentando novamente...');
      setTimeout(() => this.initializePlayer(), 500);
    }
  }

  setupAudioEvents() {
    if (this.audioElement) {
      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement.duration) {
          const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
          this.updateProgress(percent);
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.updatePlayButton();
      });

      this.audioElement.addEventListener('error', (e) => {
        console.error('Erro no áudio:', e);
      });
    }
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
    this.isPlaying = !this.isPlaying;
    
    if (this.audioElement) {
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }
    
    this.updatePlayButton();
    console.log('Play/Pause toggled:', this.isPlaying);
  }

  play() {
    if (this.audioElement) {
      // Exemplo: stream de rádio (substitua por sua URL real)
      if (!this.audioElement.src) {
        // URL de teste que funciona - substitua pela sua rádio
        this.audioElement.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      }
      this.audioElement.play().catch(e => console.log('Erro ao tocar:', e));
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  // Função principal para inserir áudio (vinhetas, anúncios, etc)
  insertAudio(audioUrl, fadeTime = 1000) {
    console.log('Inserindo áudio:', audioUrl);
    
    if (!this.audioElement) {
      console.error('Elemento de áudio não encontrado');
      return;
    }

    // Valida se a URL é válida
    if (!audioUrl || typeof audioUrl !== 'string') {
      console.error('URL de áudio inválida:', audioUrl);
      return;
    }

    const originalSrc = this.audioElement.src;
    const originalTime = this.audioElement.currentTime;
    
    // Fade out atual
    this.fadeOut(fadeTime).then(() => {
      // Salva estado atual
      const wasPlaying = !this.audioElement.paused;
      
      // Toca áudio inserido
      this.audioElement.src = audioUrl;
      this.audioElement.currentTime = 0;
      
      return this.audioElement.play();
    }).then(() => {
      console.log('Áudio inserido tocando com sucesso');
      
      // Quando terminar, volta ao original
      const handleEnded = () => {
        this.audioElement.removeEventListener('ended', handleEnded);
        this.audioElement.src = originalSrc;
        this.audioElement.currentTime = originalTime;
        this.audioElement.play().then(() => {
          this.fadeIn(fadeTime);
        });
      };
      
      this.audioElement.addEventListener('ended', handleEnded);
    }).catch(e => {
      console.error('Erro na inserção de áudio:', e);
      // Em caso de erro, volta ao estado anterior
      this.audioElement.src = originalSrc;
      this.audioElement.currentTime = originalTime;
    });
  }

  fadeOut(duration = 1000) {
    return new Promise(resolve => {
      if (!this.audioElement) {
        resolve();
        return;
      }

      const startVolume = this.audioElement.volume;
      const fadeStep = startVolume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        if (this.audioElement.volume > fadeStep) {
          this.audioElement.volume -= fadeStep;
        } else {
          this.audioElement.volume = 0;
          clearInterval(fadeInterval);
          resolve();
        }
      }, 50);
    });
  }

  fadeIn(duration = 1000) {
    return new Promise(resolve => {
      if (!this.audioElement) {
        resolve();
        return;
      }

      this.audioElement.volume = 0;
      const targetVolume = 0.7; // Volume padrão
      const fadeStep = targetVolume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        if (this.audioElement.volume < targetVolume - fadeStep) {
          this.audioElement.volume += fadeStep;
        } else {
          this.audioElement.volume = targetVolume;
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
      window.radioPlayer.updateTrackName(name);
    }
  };

  window.scheduleRadioAudio = (url, delay) => {
    if (window.radioPlayer) {
      window.radioPlayer.scheduleAudio(url, delay);
    }
  };

  // Para debug - URLs de teste que funcionam
  window.testRadio = () => {
    console.log('Testando player...');
    window.updateRadioTrack('Música de Teste');
    setTimeout(() => {
      // URL de teste que funciona
      window.insertRadioAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    }, 3000);
  };

  // URLs de teste adicionais
  window.testUrls = {
    song1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    song2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    song3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  };
}
