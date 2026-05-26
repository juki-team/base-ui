import { AnimatePresence, domAnimation, LazyMotion, m } from 'motion/react';
import { renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks/useHandleState';
import { ExpandLessIcon, ExpandMoreIcon } from '../../server';
import type { CollapseProps } from './types';

export default function Collapse(props: CollapseProps) {
  const {
    children,
    header,
    className,
    showContent: _showContent,
    onChangeShowContent: _onChangeShowContent,
    startsShowing = false,
    direction = 'column',
  } = props;

  const [isOpen, setIsOpen] = useHandleState(startsShowing, _showContent, _onChangeShowContent);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      {renderReactNodeOrFunctionP1(header, {
        isOpen,
        close,
        open,
        toggle,
        icon: isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />,
        Icon: isOpen ? ExpandLessIcon : ExpandMoreIcon,
      })}
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              key="content"
              initial={direction === 'row' ? { width: 0 } : { height: 0 }}
              animate={direction === 'row' ? { width: 'auto' } : { height: 'auto' }}
              exit={direction === 'row' ? { width: 0 } : { height: 0 }}
              style={{ overflow: 'hidden' }}
              className={className}
            >
              {renderReactNodeOrFunctionP1(children, {
                isOpen,
                close,
                open,
                toggle,
              })}
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
