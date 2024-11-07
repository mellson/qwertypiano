import React from 'react';
import { Volume2, VolumeX, ZapOff } from 'lucide-react';
import { usePianoAudio } from '../hooks/usePianoAudio';
import { PianoKey } from './PianoKey';
import { NOTES } from '../constants/notes';

export default function Piano() {
  const { activeKeys, isMuted, toggleMute, killAllNotes } = usePianoAudio();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">QWERTY Piano</h1>
          <div className="flex gap-2">
            <button
              onClick={killAllNotes}
              className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all active:scale-95"
              aria-label="Kill all notes"
            >
              <ZapOff size={24} />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg hover:bg-white/10 text-white hover:text-indigo-200 transition-all active:scale-95"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {Object.entries(NOTES).map(([key, noteData]) => (
            <PianoKey
              key={key}
              keyChar={key}
              noteData={noteData}
              isActive={activeKeys.has(key)}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-white/60">
          Press keys to play • Use Q to ] keys
        </div>
      </div>
    </div>
  );
}