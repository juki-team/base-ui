import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const LinkedIn = memo(({ color }: RootIconProps) => (
  <>
    <path
      d="M7.85979 6.31302C7.85979 7.31432 6.99575 8.12603 5.9299 8.12603C4.86404 8.12603 4 7.31432 4 6.31302C4 5.31172 4.86404 4.5 5.9299 4.5C6.99575 4.5 7.85979 5.31172 7.85979 6.31302Z"
      fill={color}
    />
    <path d="M4.26392 9.45868H7.56289V19.5H4.26392V9.45868Z" fill={color} />
    <path
      d="M12.8742 9.45868H9.57526V19.5H12.8742C12.8742 19.5 12.8742 16.3388 12.8742 14.3623C12.8742 13.176 13.2775 11.9845 14.8866 11.9845C16.7051 11.9845 16.6941 13.537 16.6857 14.7397C16.6746 16.3119 16.701 17.9163 16.701 19.5H20V14.2004C19.9721 10.8165 19.0942 9.25723 16.2062 9.25723C14.4911 9.25723 13.428 10.0393 12.8742 10.747V9.45868Z"
      fill={color}
    />
  </>
));

export default LinkedIn;
