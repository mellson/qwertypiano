import { Volume2, VolumeX, ZapOff } from 'lucide-react';
import { NOTES } from '../constants/notes';
import { usePianoAudio } from '../hooks/usePianoAudio';
import { PianoKey } from './PianoKey';

export default function Piano() {
  const { activeKeys, isMuted, toggleMute, killAllNotes } = usePianoAudio();

  const whiteKeys = Object.entries(NOTES).filter(
    ([, data]) => data.type === 'white'
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="w-full max-w-4xl p-8 bg-white/10 backdrop-blur-lg rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Aksel Virtual Piano</h1>
          <div className="flex gap-2">
            <button
              onClick={killAllNotes}
              className="p-2 text-red-400 transition-all rounded-lg hover:bg-red-500/20 hover:text-red-300 active:scale-95"
              aria-label="Kill all notes"
            >
              <ZapOff size={24} />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 text-white transition-all rounded-lg hover:bg-white/10 hover:text-indigo-200 active:scale-95"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </div>

        <div className="relative">
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

          {/* Black keys overlay */}
          <div className="absolute top-0 -left-[2rem] right-0 z-10 flex justify-center gap-1 px-[2.25rem]">
            <div className="flex gap-1.5">
              <div className="w-[3rem] flex justify-center" />
              <PianoKey
                keyChar="s"
                noteData={NOTES.s}
                isActive={activeKeys.has('s')}
              />
              <PianoKey
                keyChar="d"
                noteData={NOTES.d}
                isActive={activeKeys.has('d')}
              />
              <div className="w-[3rem] flex justify-center" />
              <PianoKey
                keyChar="g"
                noteData={NOTES.g}
                isActive={activeKeys.has('g')}
              />
              <PianoKey
                keyChar="h"
                noteData={NOTES.h}
                isActive={activeKeys.has('h')}
              />
              <PianoKey
                keyChar="j"
                noteData={NOTES.j}
                isActive={activeKeys.has('j')}
              />
              <div className="w-[3rem] flex justify-center" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-white/60">
          White keys: Z to / • Black keys: S, D, G, H, J, L, ;
        </div>
      </div>
    </div>
  );
}
