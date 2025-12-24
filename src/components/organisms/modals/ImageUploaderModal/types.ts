import { Dispatch, ReactNode, RefObject } from 'react';
import { ModalProps } from '../../../atoms/types';

export interface ImageUploaderModalProps extends ModalProps {
  withPublicImagesTab?: boolean,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export type onPickImageUrlType = (props: { imageThumbnailUrl: string, imageUrl: string }) => void;

export type UploadImageButtonChildrenProps = { open: boolean, setOpen: Dispatch<boolean>, withLabel: boolean };

export interface ImageUploaderButtonProps {
  open: boolean,
  setOpen: Dispatch<boolean>,
  isOpenRef?: RefObject<boolean>,
  withLabel?: boolean,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
  children?: (props: UploadImageButtonChildrenProps) => ReactNode
}
