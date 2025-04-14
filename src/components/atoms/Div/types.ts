import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type DivProps =
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & {
  onClick?: () => void,
  transition?: boolean,
  onKeyDownClick?: boolean | 'Enter'
};
