/**
 * Web Speech API wrapper for real browser accessibility (text-to-speech)
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private currentText: string = '';
  private listeners: Set<(state: { isSpeaking: boolean; isPaused: boolean; currentText: string }) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (state: { isSpeaking: boolean; isPaused: boolean; currentText: string }) => void) {
    this.listeners.add(listener);
    listener({ isSpeaking: this.isSpeaking, isPaused: this.isPaused, currentText: this.currentText });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) =>
      l({ isSpeaking: this.isSpeaking, isPaused: this.isPaused, currentText: this.currentText })
    );
  }

  public speak(text: string, rate: number = 1.0, lang: string = 'es-PE') {
    if (!this.synth) {
      console.warn('Speech synthesis is not supported on this device/browser');
      return;
    }

    this.stop();

    this.currentText = text;
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = rate;
    this.utterance.pitch = 1.0;
    this.utterance.lang = lang;

    // Pick best voice if available
    const voices = this.synth.getVoices();
    const spanishVoice = voices.find(
      (v) => v.lang.startsWith('es-') || v.lang.includes('Spanish')
    );
    if (spanishVoice) {
      this.utterance.voice = spanishVoice;
    }

    this.utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify();
    };

    this.utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = '';
      this.notify();
    };

    this.utterance.onerror = (e) => {
      console.error('TTS error:', e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
    };

    this.synth.speak(this.utterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = '';
      this.notify();
    }
  }

  public togglePlay(text: string, rate: number = 1.0, lang: string = 'es-PE') {
    if (this.isSpeaking && !this.isPaused && this.currentText === text) {
      this.pause();
    } else if (this.isPaused && this.currentText === text) {
      this.resume();
    } else {
      this.speak(text, rate, lang);
    }
  }
}

export const speechService = new SpeechService();
