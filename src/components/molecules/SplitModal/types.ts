import type { ReactElement } from 'react';
import type { ReactNodeOrFunctionType } from '../../../types';
import type { ModalButtonLoaderEventType, ModalProps } from '../../atoms/Modal/types';

export interface SplitModalProps<T extends ModalButtonLoaderEventType> extends ModalProps<T> {
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeOnKeyEscape?: boolean,
  closeOnClickOverlay?: boolean,
  children: ReactElement,
}
