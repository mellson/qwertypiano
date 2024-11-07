export interface NoteData {
  note: string;
  freq: number;
  type: 'white' | 'black';
}

export interface AudioNode {
  oscillator: OscillatorNode;
  gainNode: GainNode;
}