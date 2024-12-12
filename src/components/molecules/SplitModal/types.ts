import { ReactElement } from 'react';
import { ModalButtonLoaderEventType, ReactNodeOrFunctionType } from '../../../types';
import { BasicModalProps } from '../../atoms/types';

export interface SplitModalProps<T extends ModalButtonLoaderEventType> extends BasicModalProps<T> {
  className?: string,
  title: ReactNodeOrFunctionType,
  graphic: ReactNodeOrFunctionType,
  closeIcon?: boolean,
  closeOnKeyEscape?: boolean,
  closeOnClickOverlay?: boolean,
  children: ReactElement,
}
