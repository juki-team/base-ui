import type { Dispatch, ReactNode, RefObject } from 'react';
import type { ModalProps } from '../../../atoms/types';

export interface ImageUploaderModalProps extends ModalProps {
  withPublicImagesTab?: boolean;
  copyButtons?: boolean;
  onPickImageUrl?: OnPickImageUrlType;
}

export type OnPickImageUrlType = (props: { imageThumbnailUrl: string; imageUrl: string }) => void;

export type UploadImageButtonChildrenProps = { open: boolean; setOpen: Dispatch<boolean>; withLabel: boolean };

export interface ImageUploaderButtonProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  isOpenRef?: RefObject<boolean>;
  withLabel?: boolean;
  copyButtons?: boolean;
  onPickImageUrl?: OnPickImageUrlType;
  children?: (props: UploadImageButtonChildrenProps) => ReactNode;
}
