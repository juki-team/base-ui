import { create } from 'zustand';

interface AnimationFrameState {
  frames: { [key: string]: number },
  addFrame: (id: string) => void,
  subFrame: (id: string) => void,
  framePending: boolean,
}

export const useAnimationFrameStore = create<AnimationFrameState>((set, get) => ({
  frames: {},
  framePending: false,
  addFrame: (id) => {
    const frames = { ...get().frames, [id]: (get().frames[id] ?? 0) + 1 };
    set({ frames, framePending: true });
  },
  subFrame: (id) => {
    const frames = get().frames;
    const frame = frames[id];
    if (typeof frame === 'number') {
      if (frame <= 1) {
        const { [id]: oldFrame, ...rest } = frames;
        set({ frames: rest, framePending: Object.values(rest).length > 0 });
      } else {
        set({ frames: { ...get().frames, [id]: (get().frames[id] ?? 0) - 1 } });
      }
    }
  },
}));
