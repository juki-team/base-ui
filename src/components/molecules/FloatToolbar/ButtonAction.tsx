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
    type = 'primary',
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
  const { ref: refButtonTrigger, width: buttonTriggerWidth = 0, height: buttonTriggerHeight = 0 } = useResizeDetector();
  const lastWidthRef = useRef({ width, height });
  if (width) {
    lastWidthRef.current.width = width;
  }
  if (height) {
    lastWidthRef.current.height = height;
  }
  
  return (
    <div
      className={classNames('button-action jk-row', className, placement, {
        open,
        'right': !!placement?.includes('right') && !placement?.includes('out'),
        'left': !(!!placement?.includes('right') && !placement?.includes('out')) && !className?.includes('center'),
        'no-buttons': !buttons.length,
      })}
      onClick={viewPortSize === 'sm' ? () => setOpen(true) : undefined}
      ref={ref}
      style={{
        '--jk-float-toolbar-buttons-content-width': `${width || lastWidthRef.current.width}px`,
        '--jk-float-toolbar-buttons-content-height': `${height || lastWidthRef.current.height}px`,
        '--jk-float-toolbar-button-trigger-width': `${buttonTriggerWidth}px`,
        '--jk-float-toolbar-button-trigger-height': `${buttonTriggerHeight}px`,
      } as CSSProperties}
    >
      <div className="button-trigger jk-row" ref={refButtonTrigger}>
        {children ?? <ButtonLoader
          icon={icon}
          type={type}
          size={size}
          setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
          disabled={disabled}
        />}
      </div>
      <div
        className={classNames('buttons-content jk-col gap stretch nowrap', { 'jk-pg-sm': !!placement?.includes('center') })}
        ref={refButtonsContent}
      >
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
