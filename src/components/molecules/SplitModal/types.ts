import type { ReactElement } from 'react';
import type { ModalButtonLoaderEventType, ModalProps } from '../../atoms/Modal/types';
import { ReactNodeOrFunctionType } from '../../types/commons';

export interface SplitModalProps<T extends ModalButtonLoaderEventType> extends ModalProps<T> {
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeOnKeyEscape?: boolean,
  closeOnClickOverlay?: boolean,
  children: ReactElement,
}
