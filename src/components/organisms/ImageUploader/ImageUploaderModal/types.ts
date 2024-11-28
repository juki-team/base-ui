import { ModalProps } from '../../../atoms/types';

export interface ImageUploaderModalProps extends ModalProps {
  withPublicImagesTab?: boolean,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export type onPickImageUrlType = (props: { imageThumbnailUrl: string, imageUrl: string }) => void;
