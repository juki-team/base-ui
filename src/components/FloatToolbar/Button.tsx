import React, { useRef } from 'react';
import { Status } from '../../types';
import { ButtonLoader, SetLoaderStatusOnClickType } from '../Button';
import { ButtonActionProps } from './types';

export const ButtonAction = ({ icon, buttons }: ButtonActionProps) => {
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <div className="button-action">
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