export const NOTES = {
  // White keys (bottom row)
  z: { note: 'C4', freq: 261.63, type: 'white' }, // Correct
  x: { note: 'D4', freq: 293.66, type: 'white' }, // Fixed from 329.63
  c: { note: 'E4', freq: 329.63, type: 'white' }, // Fixed from 349.23
  v: { note: 'F4', freq: 349.23, type: 'white' }, // Fixed from 392.0
  b: { note: 'G4', freq: 392.0, type: 'white' }, // Fixed from 440.0
  n: { note: 'A4', freq: 440.0, type: 'white' }, // Fixed from 493.88
  m: { note: 'B4', freq: 493.88, type: 'white' }, // Fixed from B5/523.25

  // Black keys (top row)
  s: { note: 'C#4', freq: 277.18, type: 'black' }, // Correct
  d: { note: 'D#4', freq: 311.13, type: 'black' }, // Correct
  g: { note: 'F#4', freq: 369.99, type: 'black' }, // Correct
  h: { note: 'G#4', freq: 415.3, type: 'black' }, // Correct
  j: { note: 'A#4', freq: 466.16, type: 'black' }, // Correct
} as const;
