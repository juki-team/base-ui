import { Status } from '@juki-team/commons';
import React, { memo, useState } from 'react';
import { settings } from '../../../../config';
import { toBlob } from '../../../../helpers';
import { Button, ButtonLoader } from '../../../Button';
import { CopyToClipboard } from '../../../CopyToClipboard';
import { ContentCopyIcon } from '../../../graphics';
import { CropImageType, ImageLoaderCropper } from '../../../ImageLoaderCropper';
import { NotificationType, useNotification } from '../../../Notifications';
import { T } from '../../../Translate';
import { onPickImageUrlType } from '../types';

export const UploadNewImageTab = memo(({
  copyButtons,
  onPickImageUrl,
}: { copyButtons?: boolean, onPickImageUrl?: onPickImageUrlType }) => {
  
  const [imagePublicUrl, setImagePublicUrl] = useState<string>('');
  const [cropImage, setCropImage] = useState<CropImageType>();
  const { addNotification } = useNotification();
  const handleUpload = async (image: Blob) => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const { url, ...options } = settings.getAPI().image.create({ body: formData });
      const data = await (await fetch(url, options)).json();
      if (data.success) {
        return { status: Status.SUCCESS, message: data.message, content: data.content };
      } else {
        return { status: Status.ERROR, message: data.message };
      }
    } catch (e) {
      return { status: Status.ERROR, message: 'Ups, please try again' };
    }
  };
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
              extend
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
              const { status, message, content } = await handleUpload(blob);
              if (status === Status.SUCCESS) {
                addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
                setLoader?.(Status.SUCCESS);
                setImagePublicUrl(content.imageUrl);
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
