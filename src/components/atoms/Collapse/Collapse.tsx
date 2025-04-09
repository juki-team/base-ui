import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks/useHandleState';
import { ExpandLessIcon, ExpandMoreIcon } from '../icons';
import { CollapseProps } from './types';

export const Collapse = (props: CollapseProps) => {
  
  const {
    children,
    header,
    className,
    showContent: _showContent,
    onChangeShowContent: _onChangeShowContent,
    startsShowing = false,
    direction = 'column',
  } = props;
  
  const [ isOpen, setIsOpen ] = useHandleState(startsShowing, _showContent, _onChangeShowContent);
  // const [ isFullyClosed, setIsFullyClosed ] = useState(false);
  // const [ isFullyOpened, setIsFullyOpened ] = useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prevState => !prevState);
  
  // const currentIsFullyClosed = isOpen ? false : isFullyClosed;
  // const currentIsFullyOpened = !isOpen ? false : isFullyOpened;
  
  return (
    // <div
    //   className={classNames('jk-collapse-container jk-col stretch', className, {
    //     collapsed: !isOpen,
    //     // 'is-fully-opened': currentIsFullyOpened,
    //     // 'is-fully-closed': currentIsFullyClosed,
    //   })}
    // >
    <>
      {renderReactNodeOrFunctionP1(header, {
        isOpen,
        close,
        open,
        toggle,
        // isFullyClosed: currentIsFullyClosed,
        // isFullyOpened: currentIsFullyOpened,
        icon: isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />,
        Icon: isOpen ? ExpandLessIcon : ExpandMoreIcon,
      })}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
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
              // isFullyClosed: currentIsFullyClosed,
              // isFullyOpened: currentIsFullyOpened,
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
