import { type CSSProperties } from 'react';
import './styles.scss';

export const LineLoader = ({ delay = 5, style }: { delay?: number, style?: CSSProperties }) => {
  return (
    <div className="layout-line-loader" style={{ '--delay': delay, ...style } as CSSProperties}>
      <div />
    </div>
  );
};
