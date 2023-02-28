import { ButtonLoaderOnClickType } from '../../Button';

export type ModalProps = {
  isOpen: boolean,
  onClose: ButtonLoaderOnClickType,
  className?: string,
  closeIcon?: boolean,
  expand?: boolean,
  closeWhenKeyEscape?: boolean,
  closeWhenClickOutside?: boolean,
}
