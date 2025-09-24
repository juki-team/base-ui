import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent, PropsWithChildren } from 'react';
import { ButtonLoaderOnClickType, LoaderStatusOnClickType, SetLoaderStatusOnClickType } from '../../types/commons';

export type OnClickModalEventType = {
  overlayOnClickEvent?: MouseEvent<HTMLDivElement>,
  closeButtonOnClickEvent?: MouseEvent<HTMLDivElement>,
  onKeyDownEvent?: KeyboardEvent | ReactKeyboardEvent,
  fetcherLayerErrorEvent?: any,
};

export type ModalButtonLoaderEventType = ButtonLoaderOnClickType<OnClickModalEventType>;

export interface BasicModalProps<T extends ModalButtonLoaderEventType = () => void> {
  isOpen: boolean,
  onClose: T,
}

export type ModalProps<T extends ModalButtonLoaderEventType = () => void> = PropsWithChildren<BasicModalProps<T> & {
  className?: string,
  containerClassName?: string,
  closeIcon?: boolean,
  expand?: boolean,
  closeOnKeyEscape?: boolean,
  closeOnClickOverlay?: boolean,
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onLoaderStatusChange?: (status: LoaderStatusOnClickType) => void,
}>
