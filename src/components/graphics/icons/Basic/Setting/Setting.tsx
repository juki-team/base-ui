import React, { memo } from 'react';
import { RootIconProps } from '../../types';

const Setting = memo(({ color }: RootIconProps) => (
  <path
    d="M19.6407 12.98C19.6818 12.66 19.7127 12.34 19.7127 12C19.7127 11.66 19.6818 11.34 19.6407 11.02L21.8099 9.37C22.0052 9.22 22.0566 8.95 21.9333 8.73L19.8772 5.27C19.7538 5.05 19.4762 4.97 19.25 5.05L16.6902 6.05C16.1556 5.65 15.5799 5.32 14.9528 5.07L14.5621 2.42C14.5313 2.18 14.3154 2 14.0584 2H9.94616C9.68915 2 9.47326 2.18 9.44242 2.42L9.05176 5.07C8.42465 5.32 7.84894 5.66 7.31435 6.05L4.7545 5.05C4.51804 4.96 4.25075 5.05 4.12738 5.27L2.07128 8.73C1.93763 8.95 1.99931 9.22 2.19464 9.37L4.36384 11.02C4.32271 11.34 4.29187 11.67 4.29187 12C4.29187 12.33 4.32271 12.66 4.36384 12.98L2.19464 14.63C1.99931 14.78 1.94791 15.05 2.07128 15.27L4.12738 18.73C4.25075 18.95 4.52832 19.03 4.7545 18.95L7.31435 17.95C7.84894 18.35 8.42465 18.68 9.05176 18.93L9.44242 21.58C9.47326 21.82 9.68915 22 9.94616 22H14.0584C14.3154 22 14.5313 21.82 14.5621 21.58L14.9528 18.93C15.5799 18.68 16.1556 18.34 16.6902 17.95L19.25 18.95C19.4865 19.04 19.7538 18.95 19.8772 18.73L21.9333 15.27C22.0566 15.05 22.0052 14.78 21.8099 14.63L19.6407 12.98V12.98ZM12.0023 15.5C10.0181 15.5 8.40408 13.93 8.40408 12C8.40408 10.07 10.0181 8.5 12.0023 8.5C13.9864 8.5 15.6005 10.07 15.6005 12C15.6005 13.93 13.9864 15.5 12.0023 15.5Z"
    fill={color}
  />
));

export default Setting;
