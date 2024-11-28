import { ImageSummaryResponseDTO } from '@juki-team/commons';
import React, { useEffect } from 'react';
import { KeyedMutator } from 'swr';
import { copy } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks';
import { CheckIcon, ContentCopyIcon, T } from '../../../../atoms';
import { FloatToolbar } from '../../../../molecules';
import { NotificationType } from '../../../types';
import { onPickImageUrlType } from '../types';

interface PublicImagesTabProps {
  trigger: number,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
  publicImages: ImageSummaryResponseDTO[],
  mutate: KeyedMutator<any>,
}

export const PublicImages = (props: PublicImagesTabProps) => {
  
  const {
    trigger,
    copyButtons,
    onPickImageUrl,
    publicImages,
    mutate,
  } = props;
  useEffect(() => {
    void mutate();
  }, [ trigger, mutate ]);
  
  const { addNotification } = useJukiNotification();
  
  return (
    <div className="public-images-tab jk-row">
      {publicImages.map((publicImage, index) => (
        <div className="thumbnail" key={publicImage.imageUrl}>
          <img src={publicImage.imageThumbnailUrl} alt={'image ' + index} />
          <FloatToolbar
            actionButtons={[
              ...(copyButtons ? [
                {
                  icon: <ContentCopyIcon />,
                  buttons: [
                    {
                      icon: <ContentCopyIcon size="small" />, label: <T>URL</T>, onClick: () => {
                        copy(publicImage.imageUrl);
                        addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                      },
                    },
                    {
                      icon: <ContentCopyIcon />, label: <T>MD</T>, onClick: () => {
                        copy(`![image alt](${publicImage.imageUrl})`);
                        addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                      },
                    },
                  ],
                },
              ] : []),
              ...(onPickImageUrl ? [
                {
                  icon: <CheckIcon />,
                  buttons: [
                    {
                      icon: <CheckIcon size="small" />, label: <T>pick</T>, onClick: () => {
                        onPickImageUrl(publicImage);
                        addNotification({ type: NotificationType.QUIET, message: <T>picked</T> });
                      },
                    },
                  ],
                },
              ] : []),
            ]}
          />
        </div>
      ))}
    </div>
  );
};
