export const NOTES = {
  // White keys (bottom row)
  'z': { note: 'C4', freq: 261.63, type: 'white' },
  'x': { note: 'C4', freq: 293.66, type: 'white' },
  'c': { note: 'D4', freq: 329.63, type: 'white' },
  'v': { note: 'E4', freq: 349.23, type: 'white' },
  'b': { note: 'F4', freq: 392.00, type: 'white' },
  'n': { note: 'G4', freq: 440.00, type: 'white' },
  'm': { note: 'A4', freq: 493.88, type: 'white' },
  ',': { note: 'B5', freq: 523.25, type: 'white' },
  '.': { note: 'C5', freq: 587.33, type: 'white' },
  '-': { note: 'D5', freq: 659.25, type: 'white' },

  // Black keys (top row)
  's': { note: 'C#4', freq: 277.18, type: 'black' },
  'd': { note: 'D#4', freq: 311.13, type: 'black' },
  'g': { note: 'F#4', freq: 369.99, type: 'black' },
  'h': { note: 'G#4', freq: 415.30, type: 'black' },
  'j': { note: 'A#4', freq: 466.16, type: 'black' },
  'l': { note: 'C#5', freq: 554.37, type: 'black' },
  ';': { note: 'D#5', freq: 622.25, type: 'black' },
} as const;