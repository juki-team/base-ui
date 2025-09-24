import { classNames } from '../../../../../../helpers';
import type { IconProps } from '../../types';
import Telegram from './Telegram';

export const TelegramIcon = ({
                               size = 'regular',
                               className = '',
                               percent = 100,
                               ...props
                             }: IconProps & { percent?: number }) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', size)} style={{ position: 'relative' }}>
      <Telegram />
    </span>
  );
};
