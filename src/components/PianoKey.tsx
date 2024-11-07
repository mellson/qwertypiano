import React from 'react';
import { NoteData } from '../types/piano';

interface PianoKeyProps {
  keyChar: string;
  noteData: NoteData;
  isActive: boolean;
}

export function PianoKey({ keyChar, noteData, isActive }: PianoKeyProps) {
  const isBlack = noteData.type === 'black';
  
  return (
    <div
      className={`
        ${isBlack ? 'w-12 h-32' : 'w-16 h-48'} 
        relative flex items-end justify-center pb-4
        rounded-lg transition-all
        ${isBlack ? 'bg-gray-900 hover:bg-orange-600' : 'bg-white hover:bg-pink-500'}
        ${isActive ? 'scale-[0.98] ' + (isBlack ? 'bg-red-700' : 'bg-blue-500') : ''}
        ${isBlack ? 'shadow-lg' : 'shadow-md'}
      `}
    >
      <div className="flex flex-col items-center gap-1">
        <span className={`text-sm font-bold uppercase ${isBlack ? 'text-gray-400' : 'text-gray-400'}`}>
          {keyChar}
        </span>
        <span className={`text-xs ${isBlack ? 'text-gray-500' : 'text-gray-500'}`}>
          {noteData.note}
        </span>
      </div>
    </div>
  );
}