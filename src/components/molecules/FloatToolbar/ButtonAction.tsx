import { Status } from '@juki-team/commons';
import React, { CSSProperties, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { useJukiUI, useOutsideAlerter } from '../../../hooks';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import { SetLoaderStatusOnClickType } from '../ButtonLoader/types';
import { ButtonActionProps } from './types';

export const ButtonAction = ({ icon, buttons, disabled }: ButtonActionProps) => {
  
  const { viewPortSize } = useJukiUI();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(null);
  const [ open, setOpen ] = useState(false);
  const ref = useRef(null);
  useOutsideAlerter(() => setOpen(false), ref);
  const { ref: refButtonsContent, width = 0 } = useResizeDetector();
  const lastWidthRef = useRef(width);
  if (width) {
    lastWidthRef.current = width;
  }
  
  return (
    <div
      className={classNames('button-action', { open })}
      onClick={viewPortSize === 'sm' ? () => setOpen(true) : undefined}
      ref={ref}
      style={{ '--buttons-content-width': `${width || lastWidthRef.current}px` } as CSSProperties}
    >
      <div className="button-trigger">
        <ButtonLoader
          icon={icon}
          type="primary"
          size="small"
          setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
          disabled={disabled}
        />
      </div>
      <div className="buttons-content" ref={refButtonsContent}>
        {buttons.map(({ icon, onClick, label, disabled }, index) => (
          <ButtonLoader
            key={index}
            icon={icon}
            size="small"
            disabled={disabled}
            onClick={async setLoader => {
              const result = onClick();
              if (result instanceof Promise) {
                result
                  .then?.(() => {
                  setLoader(Status.SUCCESS);
                  setLoaderRef.current?.(Status.SUCCESS);
                })
                  .catch(() => {
                    setLoader(Status.ERROR);
                    setLoaderRef.current?.(Status.ERROR);
                  });
                setLoader(Status.LOADING);
                setLoaderRef.current?.(Status.LOADING);
              }
            }}
          >
            {label}
          </ButtonLoader>
        ))}
      </div>
    </div>
  );
};
