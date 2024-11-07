import React from 'react';
import { NoteData } from '../types/piano';

interface PianoKeyProps {
  keyChar: string;
  noteData: NoteData;
  isActive: boolean;
}

export function PianoKey({ keyChar, noteData, isActive }: PianoKeyProps) {
  return (
    <div
      className={`col-span-1 aspect-square rounded-lg flex items-center justify-center text-center transition-all ${
        isActive
          ? 'bg-indigo-500 scale-95 shadow-lg'
          : 'bg-white/20 hover:bg-white/30'
      }`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-white text-xl font-bold uppercase">
          {keyChar}
        </span>
        <span className="text-indigo-200 text-sm">{noteData.note}</span>
      </div>
    </div>
  );
}