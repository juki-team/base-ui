import { AnimatePresence, motion } from 'motion/react';
import { type CSSProperties, useEffect, useState } from 'react';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms';

export const UserLoaderLayout = () => {
  
  const userSessionId = useUserStore(state => state.user.sessionId);
  const userNickname = useUserStore(state => state.user.nickname);
  const [ showLoader, setShowLoader ] = useState(true);
  
  useEffect(() => {
    
    if (!userSessionId) {
      return;
    }
    
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [ setShowLoader, userSessionId ]);
  
  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.9, y: '-100vh' }}
          transition={{ ease: 'easeOut' }}
          className="expand-absolute pe-ne jk-col bc-pd"
          style={{ zIndex: 999 }}
        >
          <h1
            className="jk-row cr-pt"
            style={{ alignItems: 'baseline' }}
          >
            {!userSessionId ? (
              <>
                <T className="tt-se">loading user</T>&nbsp;
                <div
                  className="dot-flashing"
                  style={{
                    '--dot-flashing-color': 'var(--cr-py-tx)',
                    '--dot-flashing-color-light': 'var(--cr-pl)',
                    '--dot-flashing-size': '10px',
                  } as CSSProperties}
                />
              </>
            ) : (
              <div className="jk-col">
                <T className="tt-se">welcome</T>
                {userNickname && <div>{userNickname}</div>}
              </div>
            )}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
