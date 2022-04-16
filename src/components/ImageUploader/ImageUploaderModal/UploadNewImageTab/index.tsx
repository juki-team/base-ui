import React, { memo, useState } from 'react';
import { settings } from '../../../../config';
import { Status } from '../../../../types';
import { ButtonLoader } from '../../../Button';
import { CopyToClipboard } from '../../../CopyToClipboard';
import { CopyIcon } from '../../../graphics';
import { NotificationType, useNotification } from '../../../Notifications';
import { T } from '../../../Translate';
import { ImageLoaderAndCropper } from '../../ImageLoaderAndCropper';

export const UploadNewImageTab = memo(() => {
  
  const [imagePublicUrl, setImagePublicUrl] = useState<string>('');
  const { addNotification } = useNotification();
  const handleUpload = async (image: Blob) => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const data = await (await fetch(...settings.UTILS_API.POST_PUBLIC_IMAGE(formData))).json();
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
    <div className="upload-new-image-tab">
      {imagePublicUrl && (
        <div className="result-box">
          <div className="jk-row gap start text-semi-bold">
            Public url:
            <CopyToClipboard text={imagePublicUrl}>
              <div className="copyable">
                <a href={imagePublicUrl} className="link" target="_blank" rel="noreferrer">{imagePublicUrl}</a>
                <CopyIcon size="tiny" />
              </div>
            </CopyToClipboard>
          </div>
          <div className="jk-row gap start text-semi-bold">
            Markdown use:
            <CopyToClipboard text={`![image alt](${imagePublicUrl})`}>
              <div className="copyable">
                <span className="text-xs text-semi-bold">![image alt]({imagePublicUrl})</span>
                <CopyIcon size="tiny" />
              </div>
            </CopyToClipboard>
          </div>
        </div>
      )}
      <ImageLoaderAndCropper
        action={
          croppedImage => (
            <ButtonLoader
              onClick={async (setLoader) => {
                if (croppedImage.blob) {
                  setLoader?.(Status.LOADING);
                  const { status, message, content } = await handleUpload(croppedImage.blob);
                  if (status === Status.SUCCESS) {
                    addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
                    setLoader?.(Status.SUCCESS);
                    setImagePublicUrl(content.imageUrl);
                  } else {
                    addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
                    setLoader?.(Status.ERROR);
                  }
                }
              }}
              disabled={!croppedImage.blob}
            >
              <T>upload image</T>
            </ButtonLoader>
          )
        }
      />
    </div>
  );
});