import { ImageSummaryResponseDTO } from '@juki-team/commons';
import { copy } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { NotificationType } from '../../../../../types';
import { T } from '../../../../atoms';
import { FloatToolbar } from '../../../../molecules';
import { CheckIcon, ContentCopyIcon } from '../../../../server';
import { onPickImageUrlType } from '../../types';

interface PublicImagesTabProps {
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
  publicImages: ImageSummaryResponseDTO[],
}

export const PublicImages = (props: PublicImagesTabProps) => {
  
  const {
    copyButtons,
    onPickImageUrl,
    publicImages,
  } = props;
  
  const { addNotification } = useJukiNotification();
  
  return (
    <div className="public-images-tab jk-row">
      {publicImages.map((publicImage, index) => (
        <div className="thumbnail" key={publicImage.imageUrl}>
          <img src={publicImage.imageThumbnailUrl + `?v=${new Date().getTime()}`} alt={'image ' + index} />
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
