import React from 'react';
import { Volume2, VolumeX, ZapOff } from 'lucide-react';
import { usePianoAudio } from '../hooks/usePianoAudio';
import { PianoKey } from './PianoKey';
import { NOTES } from '../constants/notes';

export default function Piano() {
  const { activeKeys, isMuted, toggleMute, killAllNotes } = usePianoAudio();

  const whiteKeys = Object.entries(NOTES).filter(([_, data]) => data.type === 'white');
  const blackKeys = Object.entries(NOTES).filter(([_, data]) => data.type === 'black');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Aksel Virtual Piano</h1>
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

        <div className="relative">
          {/* Black keys overlay */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-1 px-[2.25rem]">
            <div className="flex gap-1">
              <div className="w-[3rem] flex justify-center" />
              <PianoKey keyChar="s" noteData={NOTES.s} isActive={activeKeys.has('s')} />
              <PianoKey keyChar="d" noteData={NOTES.d} isActive={activeKeys.has('d')} />
              <div className="w-[3rem] flex justify-center" />
              <PianoKey keyChar="g" noteData={NOTES.g} isActive={activeKeys.has('g')} />
              <PianoKey keyChar="h" noteData={NOTES.h} isActive={activeKeys.has('h')} />
              <PianoKey keyChar="j" noteData={NOTES.j} isActive={activeKeys.has('j')} />
              <div className="w-[3rem] flex justify-center" />
              <PianoKey keyChar="l" noteData={NOTES.l} isActive={activeKeys.has('l')} />
              <PianoKey keyChar=";" noteData={NOTES[';']} isActive={activeKeys.has(';')} />
            </div>
          </div>

          {/* White keys */}
          <div className="flex justify-center gap-1">
            {whiteKeys.map(([key, noteData]) => (
              <PianoKey
                key={key}
                keyChar={key}
                noteData={noteData}
                isActive={activeKeys.has(key)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-white/60">
          White keys: Z to / • Black keys: S, D, G, H, J, L, ;
        </div>
      </div>
    </div>
  );
}