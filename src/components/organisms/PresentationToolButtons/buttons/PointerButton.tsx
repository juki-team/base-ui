import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../atoms';
import { StylusLaserPointerIcon } from '../../../atoms/server';
import { classNames } from '../../../helpers';

export function PointerButton() {
  
  const laserRef = useRef<HTMLDivElement | null>(null);
  const [ isActive, setIsActive ] = useState(false);
  
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (laserRef.current) {
        laserRef.current.style.left = `${e.clientX}px`;
        laserRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    if (isActive) {
      const laser = document.createElement('div');
      laser.className = 'laser-pointer';
      
      document.body.appendChild(laser);
      laserRef.current = laser;
      window.addEventListener('mousemove', move);
    } else {
      if (laserRef.current) {
        laserRef.current.remove();
      }
    }
    
    return () => {
      window.removeEventListener('mousemove', move);
      if (laserRef.current) {
        laserRef.current.remove();
      }
    };
  }, [ isActive ]);
  
  return (
    <div className={classNames('jk-row right', { 'is-active': isActive })}>
      <Button
        tooltipContent={isActive ? 'exit laser pointer' : 'active laser pointer'}
        type={isActive ? 'secondary' : 'light'}
        size="tiny"
        icon={<StylusLaserPointerIcon />}
        onClick={() => setIsActive(!isActive)}
      />
    </div>
  );
}
