export type ModalProps = {
  isOpen: boolean,
  onClose: () => void,
  className?: string,
  closeIcon?: boolean,
  expand?: boolean,
  shouldCloseOnOverlayClick?: boolean,
}
