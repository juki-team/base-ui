import { getServerDict } from './cache';
import { translate } from './shared';
import type { TProps } from './types';

export function T({ className = '', children, style }: TProps) {
  return (
    <span className={className} style={style}>
      {translate(getServerDict(), children)}
    </span>
  );
}
