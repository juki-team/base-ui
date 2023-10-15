import { ButtonLoaderOnClickType } from '../../molecules';

export interface BasicModalProps {
  onClose: ButtonLoaderOnClickType,
}

export type ModalProps = BasicModalProps & {
  isOpen: boolean,
  className?: string,
  closeIcon?: boolean,
  expand?: boolean,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
}
