import { Status } from '@juki-team/commons';
import React, { memo, useState } from 'react';
import { handleUploadImage, toBlob } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks';
import { Button, ContentCopyIcon, CopyToClipboard, T } from '../../../../atoms';
import { ButtonLoader, CropImageType, ImageLoaderCropper } from '../../../../molecules';
import { NotificationType } from '../../../types';
import { onPickImageUrlType } from '../types';

export interface UploadNewImageTabProps {
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export const UploadNewImageTab = memo(({ copyButtons, onPickImageUrl }: UploadNewImageTabProps) => {
  
  const [ imagePublicUrl, setImagePublicUrl ] = useState<string>('');
  const [ cropImage, setCropImage ] = useState<CropImageType>();
  const { addNotification } = useJukiNotification();
  
  return (
    <div className="upload-new-image-tab jk-col top gap">
      {imagePublicUrl && (
        <div className="jk-col left">
          {copyButtons && (
            <>
              <div className="jk-row gap left fw-bd">
                <T>public url</T>:
                <CopyToClipboard text={imagePublicUrl}>
                  <div className="copyable jk-row">
                    <a href={imagePublicUrl} className="link" target="_blank" rel="noreferrer">{imagePublicUrl}</a>
                    <ContentCopyIcon size="small" />
                  </div>
                </CopyToClipboard>
              </div>
              <div className="jk-row gap left fw-bd">
                <T>markdown use</T>:
                <CopyToClipboard text={`![image alt](${imagePublicUrl})`}>
                  <div className="copyable jk-row">
                    <span className="tx-t fw-bd">![image alt]({imagePublicUrl})</span>
                    <ContentCopyIcon size="small" />
                  </div>
                </CopyToClipboard>
              </div>
            </>
          )}
          {onPickImageUrl && (
            <Button
              onClick={() => onPickImageUrl({
                imageUrl: imagePublicUrl,
                imageThumbnailUrl: imagePublicUrl.replace('https://images.juki.pub/o/', 'https://images.juki.pub/t/'),
              })}
              size="small"
              expand
            >
              <T>pick</T>
            </Button>
          )}
        </div>
      )}
      <ButtonLoader
        onClick={async (setLoader) => {
          if (cropImage?.previewCanvasRef.current) {
            const blob = await toBlob(cropImage.previewCanvasRef.current);
            if (blob) {
              setLoader?.(Status.LOADING);
              const { status, message, content } = await handleUploadImage(blob);
              if (status === Status.SUCCESS) {
                addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
                setLoader?.(Status.SUCCESS);
                setImagePublicUrl(content!.imageUrl);
              } else {
                addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
                setLoader?.(Status.ERROR);
              }
            }
          }
        }}
        disabled={!cropImage || !cropImage?.previewCanvasRef.current}
        size="small"
      >
        <T>upload image</T>
      </ButtonLoader>
      <ImageLoaderCropper onCropChange={setCropImage} withAspect withRotate withScale />
    </div>
  );
});
