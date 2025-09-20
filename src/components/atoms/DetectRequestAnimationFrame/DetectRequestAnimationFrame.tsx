import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { useAnimationFrameStore } from '../../../stores/animationFrame/useAnimationFrameStore';
import { DetectRequestAnimationFrameProps } from './types';

export const DetectRequestAnimationFrame = ({ name = '' }: DetectRequestAnimationFrameProps) => {
  const refId = useRef(name + v4());
  const addFrame = useAnimationFrameStore(store => store.addFrame);
  const subFrame = useAnimationFrameStore(store => store.subFrame);
  
  useEffect(() => {
    addFrame(refId.current);
    requestAnimationFrame(() => {
      subFrame(refId.current);
    });
  });
  
  return null;
};
