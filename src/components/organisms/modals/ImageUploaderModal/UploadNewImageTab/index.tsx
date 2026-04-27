import { NotificationType, Status } from '@juki-team/commons/enums';
import { memo, useState } from 'react';
import { Button, CopyToClipboard, InputToggle, T } from '../../../../atoms';
import { classNames, handleUploadImage, toBlob } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { ButtonLoader, ImageLoaderCropper } from '../../../../molecules';
import type { CropImageType } from '../../../../molecules/types';
import type { OnPickImageUrlType } from '../types';

export interface UploadNewImageTabProps {
  copyButtons?: boolean;
  onPickImageUrl?: OnPickImageUrlType;
  onUploadedImage: () => void;
}

export const UploadNewImageTab = memo(function UploadNewImageTabCmp({
  copyButtons,
  onPickImageUrl,
  onUploadedImage,
}: UploadNewImageTabProps) {
  const [imagePublicUrl, setImagePublicUrl] = useState<string>('');
  const [cropImage, setCropImage] = useState<CropImageType>();
  const [isPublic, setIsPublic] = useState(false);
  const { addNotification } = useJukiNotification();

  return (
    <div className="upload-new-image-tab jk-col top gap">
      {imagePublicUrl && (
        <div className="jk-col left">
          {copyButtons && (
            <>
              <div className="jk-row gap left fw-bd">
                <T>public url</T>:
                <div className="copyable jk-row">
                  <a href={imagePublicUrl} className="link" target="_blank" rel="noreferrer">
                    {imagePublicUrl}
                  </a>
                  <CopyToClipboard text={imagePublicUrl} iconSize="small" />
                </div>
              </div>
              <div className="jk-row gap left fw-bd">
                <T>markdown use</T>:
                <div className="copyable jk-row">
                  <span className="tx-t fw-bd">![image alt]({imagePublicUrl})</span>
                  <CopyToClipboard text={`![image alt](${imagePublicUrl})`} iconSize="small" />
                </div>
              </div>
            </>
          )}
          {onPickImageUrl && (
            <Button
              onClick={() =>
                onPickImageUrl({
                  imageUrl: imagePublicUrl,
                  imageThumbnailUrl: imagePublicUrl.replace('https://images.juki.pub/o/', 'https://images.juki.pub/t/'),
                })
              }
              size="small"
              expand
            >
              <T>pick</T>
            </Button>
          )}
        </div>
      )}
      <InputToggle
        checked={isPublic}
        leftLabel={<T className={classNames('tt-se', { 'fw-bd': !isPublic })}>not public</T>}
        rightLabel={<T className={classNames('tt-se', { 'fw-bd': isPublic })}>public</T>}
        onChange={setIsPublic}
      />
      <ButtonLoader
        onClick={async (setLoader) => {
          if (cropImage?.previewCanvasRef.current) {
            const blob = await toBlob(cropImage.previewCanvasRef.current);
            if (blob) {
              setLoader?.(Status.LOADING);
              const result = await handleUploadImage(blob, isPublic);
              if (result.status === Status.SUCCESS) {
                addNotification({ type: NotificationType.SUCCESS, message: <T>{result.message}</T> });
                setLoader?.(Status.SUCCESS);
                setImagePublicUrl(result.content.imageUrl);
                onUploadedImage();
              } else {
                addNotification({ type: NotificationType.ERROR, message: <T>{result.message}</T> });
                setLoader?.(Status.ERROR);
              }
            }
          }
        }}
        disabled={!(cropImage && cropImage?.previewCanvasRef.current)}
        size="small"
      >
        <T>upload image</T>
      </ButtonLoader>
      <ImageLoaderCropper onCropChange={setCropImage} withAspect withRotate withScale />
    </div>
  );
});
