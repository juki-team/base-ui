import { type ComponentPropsWithRef, forwardRef, type ReactElement, type Ref } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { classNames } from '../../helpers';
import type { ButtonBasicProps, OnClickButtonEventType } from '../../types';

// const buttonsVariants = (isDisabled: boolean, hasChildren: boolean) => ({
//   whileHover: isDisabled ? {} : { scale: hasChildren ? 1.2 : 1.10, transition: { duration: Duration.FAST } },
//   whileTap: isDisabled ? {
//     x: [ '-1rem', '1rem', 0 ],
//     transitionEnd: { x: 0 },
//     transition: { duration: Duration.FAST },
//   } : { scale: 0.9, transition: { duration: Duration.FAST } },
// });

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
    ...restProps
  } = props;
  
  const sound = useSoundStore();
  
  const viewPortSize = usePageStore(store => store.viewPort.size);
  
  const size = (responsiveMobile && viewPortSize === 'sm') ? 'large' : _size;
  const hasChildren = !!children && (responsiveMobile ? viewPortSize !== 'sm' : true);
  
  return (
    <button
      data-tooltip-id={!!tooltipContent ? 'jk-tooltip' : ''}
      data-tooltip-content={tooltipContent}
      ref={ref}
      // variants={buttonsVariants(disabled, hasChildren)}
      // whileHover="whileHover"
      // whileTap="whileTap"
      type={submit ? 'submit' : 'button'}
      className={classNames(className, `jk-button ${type} jk-br-ie`, size, {
        expand,
        'only-icon': !hasChildren,
        disabled,
        icon: !!(icon),
      })}
      onClick={disabled
        ? (event) => {
          const button = event.currentTarget;
          
          // animation
          button.classList.remove('shake');
          void button.offsetWidth;
          button.classList.add('shake');
          
          sound.playError(0.1);
        }
        : (event => {
          const button = event.currentTarget;
          
          // animation
          button.classList.remove('shrink-click');
          void button.offsetWidth;
          button.classList.add('shrink-click');
          
          onClick?.({ onClickEvent: event });
          sound.playClick();
        })
      }
      onKeyDown={event => {
        if (event.code === 'Enter' && onClick && !disabled) {
          event.preventDefault();
          event.stopPropagation();
          onClick({ onKeyDownEvent: event });
        }
      }}
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
