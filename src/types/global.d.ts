
declare global {
  interface Window {
    radioPlayer?: {
      togglePlay: () => void;
      insertAudio: (url: string, fadeTime?: number) => void;
      updateTrackName: (name: string) => void;
      scheduleAudio: (url: string, delayMs: number) => void;
    };
    insertRadioAudio?: (url: string) => void;
    updateRadioTrack?: (name: string) => void;
    scheduleRadioAudio?: (url: string, delay: number) => void;
    testRadio?: () => void;
  }
}

export {};
