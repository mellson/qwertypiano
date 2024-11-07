import { useEffect, useRef, useState } from 'react';
import { NOTES } from '../constants/notes';
import { AudioNode } from '../types/piano';

export function usePianoAudio() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const audioNodes = useRef<Map<string, AudioNode>>(new Map());
  const keyStates = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    audioContext.current = new AudioContext();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Handle kill shortcut (Escape key)
      if (e.key === 'Escape') {
        killAllNotes();
        return;
      }
      
      // Prevent key repeat events
      if (e.repeat || keyStates.current.get(key)) return;
      
      if (NOTES[key as keyof typeof NOTES]) {
        keyStates.current.set(key, true);
        playNote(key);
        setActiveKeys(prev => new Set(prev).add(key));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (NOTES[key as keyof typeof NOTES]) {
        keyStates.current.delete(key);
        stopNote(key);
        setActiveKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      }
    };

    const cleanup = () => {
      // Stop all active notes
      audioNodes.current.forEach((_, key) => stopNote(key));
      setActiveKeys(new Set());
      keyStates.current.clear();
    };

    // Handle visibility change and blur
    const handleVisibilityChange = () => {
      if (document.hidden) cleanup();
    };

    const handleBlur = () => cleanup();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cleanup();
      
      // Cleanup audio context
      if (audioContext.current?.state !== 'closed') {
        audioContext.current?.close();
      }
    };
  }, []);

  const playNote = (key: string) => {
    if (!audioContext.current || isMuted) return;

    // Stop any existing note for this key
    stopNote(key);

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(
      NOTES[key as keyof typeof NOTES].freq,
      audioContext.current.currentTime
    );

    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.current.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    oscillator.start();
    
    audioNodes.current.set(key, { oscillator, gainNode });
  };

  const stopNote = (key: string) => {
    const nodes = audioNodes.current.get(key);
    if (nodes) {
      const { oscillator, gainNode } = nodes;
      const currentTime = audioContext.current?.currentTime || 0;
      
      try {
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.05);
        
        setTimeout(() => {
          oscillator.stop();
          oscillator.disconnect();
          gainNode.disconnect();
          audioNodes.current.delete(key);
        }, 50);
      } catch (error) {
        // Fallback cleanup if the audio node is in an invalid state
        oscillator.disconnect();
        gainNode.disconnect();
        audioNodes.current.delete(key);
      }
    }
  };

  const killAllNotes = () => {
    if (!audioContext.current) return;
    
    // Immediately stop and disconnect all audio nodes
    audioNodes.current.forEach((nodes, key) => {
      try {
        nodes.oscillator.stop();
        nodes.oscillator.disconnect();
        nodes.gainNode.disconnect();
      } catch (error) {
        // Ignore errors if nodes are already stopped
      }
    });
    
    // Clear all states
    audioNodes.current.clear();
    keyStates.current.clear();
    setActiveKeys(new Set());
  };

  const toggleMute = () => {
    if (!audioContext.current) return;
    
    setIsMuted(prev => {
      if (!prev) {
        killAllNotes();
      }
      return !prev;
    });
  };

  return {
    activeKeys,
    isMuted,
    toggleMute,
    killAllNotes
  };
}