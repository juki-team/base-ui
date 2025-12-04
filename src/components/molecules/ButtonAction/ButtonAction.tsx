import { Status } from '@juki-team/commons';
import { useRef } from 'react';
import { TriggerAction } from '../../../enums';
import { usePageStore } from '../../../stores/page/usePageStore';
import { Popover } from '../../atoms';
import { PopoverProps } from '../../atoms/_lazy_/Popover/types';
import { classNames } from '../../helpers';
import type { SetLoaderStatusOnClickType } from '../../types';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import type { ButtonActionProps } from '../FloatToolbar/types';

export function ButtonAction(props: ButtonActionProps) {
  
  const {
    children,
    icon,
    type = 'primary',
    buttons = [],
    placement = 'left-start' as PopoverProps['placement'],
    offset = 4,
    disabled,
    size = 'small',
    className,
    popoverClassName,
    ...resProps
  } = props;
  
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(null);
  
  const buttonAction = (
    <div className={classNames('button-action jk-row', className, placement)}>
      {children ?? <ButtonLoader
        {...resProps}
        icon={icon}
        type={type}
        size={size}
        setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
        disabled={disabled}
      />}
    </div>
  );
  
  if (buttons.length === 0) {
    return buttonAction;
  }
  
  return (
    <Popover
      triggerOn={isSmallScreen ? TriggerAction.CLICK : TriggerAction.HOVER}
      placement={placement}
      popoverClassName={popoverClassName}
      // open
      offset={offset}
      content={
        <div className={classNames('buttons-content jk-col gap stretch nowrap')}>
          {buttons.map(({
                          icon,
                          onClick,
                          label,
                          disabled,
                          size = 'small',
                          type = 'primary',
                          children,
                          ...props
                        }, index) => (
            children ?? <ButtonLoader
              {...props}
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
      }
    >
      {buttonAction}
    </Popover>
  );
}
