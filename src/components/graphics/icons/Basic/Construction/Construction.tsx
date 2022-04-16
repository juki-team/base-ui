import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const Construction = memo(({ color }: RootIconProps) => (
  <>
    <path
      d="M21.5391 19.1433L16.3074 13.636L14.0623 15.9995L19.2939 21.5067C19.9188 22.1645 20.9248 22.1645 21.5391 21.5067C22.1533 20.849 22.1533 19.7899 21.5391 19.1433Z"
      fill={color}
    />
    <path
      d="M18.0021 10.2358C20.0461 10.2358 21.7088 8.48551 21.7088 6.33389C21.7088 5.68729 21.5393 5.08528 21.2746 4.55017L18.4151 7.5602L16.8372 5.89911L19.6966 2.88907C19.1882 2.61037 18.6164 2.432 18.0021 2.432C15.9582 2.432 14.2955 4.18227 14.2955 6.33389C14.2955 6.79097 14.3802 7.22575 14.5179 7.62709L12.5586 9.68952L10.6735 7.70513C11.0866 7.27034 11.0866 6.568 10.6735 6.13322L9.92163 5.34169L12.1668 2.97826C10.9277 1.67391 8.91554 1.67391 7.67646 2.97826L4.68997 6.13322C4.27694 6.568 4.27694 7.27034 4.68997 7.70513L5.44188 8.49665H2.75192C2.5507 8.49665 2.36007 8.57469 2.2224 8.73077C1.92587 9.04292 1.92587 9.53344 2.2224 9.84559L4.91236 12.6773C5.2089 12.9894 5.67487 12.9894 5.97141 12.6773C6.10908 12.5323 6.1938 12.3317 6.1938 12.1198V9.28818L6.93513 10.0686C7.34816 10.5033 8.01536 10.5033 8.42838 10.0686L10.3135 12.053L3.58856 19.1321C2.96373 19.7899 2.96373 20.8489 3.58856 21.4955C4.2134 22.1533 5.21949 22.1533 5.83373 21.4955L16.763 10.0017C17.1549 10.1466 17.5679 10.2358 18.0021 10.2358Z"
      fill={color}
    />
  </>
));

export default Construction;
