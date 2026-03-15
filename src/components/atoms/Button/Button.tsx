import { type ComponentPropsWithRef, forwardRef, type ReactElement, type Ref } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { classNames } from '../../helpers';
import type { ButtonBasicProps, OnClickButtonEventType } from '../../types';

function ButtonComponent(props: ButtonCmpProps, ref: Ref<HTMLButtonElement>) {
  
  const {
    submit = false,
    type = 'primary',
    className,
    expand = false,
    icon,
    children,
    size: _size = 'regular',
    onClick,
    disabled = false,
    responsiveMobile = false,
    tooltipContent,
    'aria-label': ariaLabel,
    ...restProps
  } = props;
  
  const sound = useSoundStore();
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  
  const size = (responsiveMobile && isSmallScreen) ? 'large' : _size;
  const hasChildren = !!children && (responsiveMobile ? !isSmallScreen : true);
  const isIconOnly = !hasChildren && !!icon;
  
  return (
    <button
      data-tooltip-id={tooltipContent ? 'jk-tooltip' : ''}
      data-tooltip-content={tooltipContent}
      ref={ref}
      aria-disabled={disabled}
      aria-label={ariaLabel ?? (isIconOnly ? tooltipContent : undefined)}
      type={submit ? 'submit' : 'button'}
      className={classNames(className, `jk-button ${type} jk-br-ie`, size, {
        expand,
        'only-icon': isIconOnly,
        disabled,
        icon: !!(icon),
      })}
      onClick={disabled
        ? (event) => {
          event.preventDefault();
          const button = event.currentTarget;
          sound.playError();
          
          button.classList.remove('shake');
          void button.offsetWidth;
          button.classList.add('shake');
          
        }
        : (event => {
          const button = event.currentTarget;
          sound.playClick();
          
          // animation
          button.classList.remove('shrink-click');
          void button.offsetWidth;
          button.classList.add('shrink-click');
          
          onClick?.({ onClickEvent: event });
          
        })
      }
      {...restProps}
    >
      {icon}
      {hasChildren && children}
    </button>
  );
}

export const Button = forwardRef(ButtonComponent) as (p: ButtonCmpProps & {
  ref?: Ref<HTMLButtonElement>
}) => ReactElement;

interface ButtonCmpProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  onClick?: (props: OnClickButtonEventType) => void,
}

export type ButtonProps = ComponentPropsWithRef<typeof Button>;
