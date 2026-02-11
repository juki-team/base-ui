import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import type { TProps } from './types';

export function T({ className = '', children, style }: TProps) {
  
  const t = useI18nStore(state => state.i18n.t);
  
  return <span className={className} style={style}>{t(children)}</span>;
}
