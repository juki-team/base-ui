import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const CurvedArrow = memo(({ color }: RootIconProps) => (
  <path
    d="M16 12.4646C16 9.82353 15.01 7.43163 13.4 5.58786L15.29 3.70423C15.92 3.07636 15.48 2 14.59 2L9 2C8.45 2 8 2.44848 8 2.99663V8.56778C8 9.45478 9.08 9.90326 9.71 9.27539L11.62 7.37183C12.78 8.75714 13.5 10.5212 13.5 12.4746C13.5 15.6239 11.66 18.3447 9 19.6403C8.44 19.9094 8.16 20.5473 8.36 21.1353C8.59 21.8429 9.4 22.2017 10.08 21.8827C13.58 20.1685 16 16.6006 16 12.4646Z"
    fill={color}
  />
));

export default CurvedArrow;
