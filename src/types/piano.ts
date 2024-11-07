export interface NoteData {
  note: string;
  freq: number;
}

export interface AudioNode {
  oscillator: OscillatorNode;
  gainNode: GainNode;
}