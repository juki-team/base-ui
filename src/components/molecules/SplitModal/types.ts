import { ReactElement } from 'react';
import { ModalButtonLoaderEventType, ModalProps, ReactNodeOrFunctionType } from '../../../types';

export interface SplitModalProps<T extends ModalButtonLoaderEventType> extends ModalProps<T> {
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeOnKeyEscape?: boolean,
  closeOnClickOverlay?: boolean,
  children: ReactElement,
}
