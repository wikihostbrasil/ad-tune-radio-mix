
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
      // Exemplo: stream de rádio
      if (!this.audioElement.src) {
        this.audioElement.src = 'https://stream.example.com/radio.mp3';
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
    
    if (!this.audioElement) return;

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
      // Quando terminar, volta ao original
      this.audioElement.addEventListener('ended', () => {
        this.audioElement.src = originalSrc;
        this.audioElement.currentTime = originalTime;
        this.audioElement.play();
        this.fadeIn(fadeTime);
      }, { once: true });
    }).catch(e => {
      console.error('Erro na inserção de áudio:', e);
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

  // Para debug
  window.testRadio = () => {
    console.log('Testando player...');
    window.updateRadioTrack('Música de Teste');
    setTimeout(() => {
      window.insertRadioAudio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
    }, 3000);
  };
}
