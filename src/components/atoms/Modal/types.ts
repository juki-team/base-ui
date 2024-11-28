import { ButtonLoaderOnClickType, LoaderStatusOnClickType, SetLoaderStatusOnClickType } from '../../molecules/types';

export interface BasicModalProps {
  isOpen: boolean,
  onClose: ButtonLoaderOnClickType,
}

export type ModalProps = BasicModalProps & {
  className?: string,
  portalClassName?: string,
  closeIcon?: boolean,
  expand?: boolean,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onLoaderStatusChange?: (status: LoaderStatusOnClickType) => void,
  onAfterOpen?: () => void,
}
