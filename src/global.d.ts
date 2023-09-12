// import { Sound } from "./types";

export declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    workbox: any;
    SOUND_START: HTMLAudioElement;
    SOUND_TICK: HTMLAudioElement;
    SOUND_WIN: HTMLAudioElement;
    SOUND_LOSE: HTMLAudioElement;
  }
}
