import { Status } from '@juki-team/commons';
import React, { useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI, useOutsideAlerter } from '../../../hooks';
import { ButtonLoader, SetLoaderStatusOnClickType } from '../ButtonLoader';
import { ButtonActionProps } from './types';

export const ButtonAction = ({ icon, buttons, disabled }: ButtonActionProps) => {
  
  const { viewPortSize } = useJukiUI();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  const [ open, setOpen ] = useState(false);
  const ref = useRef(null);
  useOutsideAlerter(() => setOpen(false), ref);
  
  return (
    <div
      className={classNames('button-action', { open })}
      onClick={viewPortSize === 'sm' ? () => setOpen(true) : undefined}
      ref={ref}
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
      <div className="buttons-content">
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
