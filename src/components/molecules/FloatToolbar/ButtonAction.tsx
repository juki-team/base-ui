import { Status } from '@juki-team/commons';
import React, { CSSProperties, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import { SetLoaderStatusOnClickType } from '../ButtonLoader/types';
import { ButtonActionProps } from './types';

export const ButtonAction = (props: ButtonActionProps) => {
  
  const {
    children,
    icon,
    buttons = [],
    placement,
    disabled,
    size = 'small',
    className,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(null);
  const [ open, setOpen ] = useState(false);
  const ref = useRef(null);
  useOutsideAlerter(() => setOpen(false), ref);
  const { ref: refButtonsContent, width = 0, height = 0 } = useResizeDetector();
  const lastWidthRef = useRef({ width, height });
  if (width) {
    lastWidthRef.current.width = width;
  }
  if (height) {
    lastWidthRef.current.height = height;
  }
  
  return (
    <div
      className={classNames('button-action jk-row', className, {
        open,
        'right': !!placement?.includes('right') && !placement?.includes('out'),
        'left': !(!!placement?.includes('right') && !placement?.includes('out')) && !className?.includes('center'),
        'no-buttons': !buttons.length,
      })}
      onClick={viewPortSize === 'sm' ? () => setOpen(true) : undefined}
      ref={ref}
      style={{
        '--jk-float-toolbar-button-action-content-width': `${width || lastWidthRef.current.width}px`,
        '--jk-float-toolbar-button-action-content-height': `${height || lastWidthRef.current.height}px`,
      } as CSSProperties}
    >
      <div className="button-trigger jk-row">
        {children ?? <ButtonLoader
          icon={icon}
          type="primary"
          size={size}
          setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
          disabled={disabled}
        />}
      </div>
      <div className="buttons-content jk-col gap stretch" ref={refButtonsContent}>
        {buttons.map(({ icon, onClick, label, disabled, size = 'small', type = 'primary', children }, index) => (
          children ?? <ButtonLoader
            key={index}
            type={type}
            icon={icon}
            size={size}
            disabled={disabled}
            onClick={async setLoader => {
              const result = onClick?.();
              if (result instanceof Promise) {
                setLoader(Status.LOADING);
                setLoaderRef.current?.(Status.LOADING);
                result
                  .then?.(() => {
                  setLoader(Status.SUCCESS);
                  setLoaderRef.current?.(Status.SUCCESS);
                })
                  .catch(() => {
                    setLoader(Status.ERROR);
                    setLoaderRef.current?.(Status.ERROR);
                  });
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
