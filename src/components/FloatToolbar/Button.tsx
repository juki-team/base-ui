import { Status } from '@juki-team/commons';
import React, { useRef, useState } from 'react';
import { useJukiBase } from '../../components/Provider';
import { classNames } from '../../helpers';
import { useOutsideAlerter } from '../../hooks';
import { ButtonLoader, SetLoaderStatusOnClickType } from '../Button';
import { ButtonActionProps } from './types';

export const ButtonAction = ({ icon, buttons }: ButtonActionProps) => {
  
  const { viewPortSize } = useJukiBase();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  const [open, setOpen] = useState(false);
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
        />
      </div>
      <div className="buttons-content">
        {buttons.map(({ icon, onClick, label }, index) => (
          <ButtonLoader
            key={index}
            icon={icon}
            size="small"
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
