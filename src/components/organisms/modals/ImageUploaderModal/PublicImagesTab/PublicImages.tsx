import type { ImageSummaryResponseDTO } from '@juki-team/commons/dto';
import { NotificationType } from '@juki-team/commons/enums';
import { T } from '../../../../atoms';
import { copy } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { FloatToolbar } from '../../../../molecules';
import { CheckIcon, ContentCopyIcon } from '../../../../server';
import type { OnPickImageUrlType } from '../types';

interface PublicImagesTabProps {
  copyButtons?: boolean;
  onPickImageUrl?: OnPickImageUrlType;
  publicImages: ImageSummaryResponseDTO[];
}

export const PublicImages = (props: PublicImagesTabProps) => {
  const { copyButtons, onPickImageUrl, publicImages } = props;

  const { addNotification } = useJukiNotification();

  return (
    <div className="public-images-tab jk-row">
      {publicImages.map((publicImage, index) => (
        <div className="thumbnail" key={publicImage.imageUrl}>
          <img src={`${publicImage.imageThumbnailUrl}?v=${Date.now()}`} alt={`thumbnail ${index}`} />
          <FloatToolbar
            actionButtons={[
              ...(copyButtons
                ? [
                    {
                      icon: <ContentCopyIcon />,
                      buttons: [
                        {
                          icon: <ContentCopyIcon size="small" />,
                          label: <T>URL</T>,
                          onClick: async () => {
                            await copy(publicImage.imageUrl);
                            addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                          },
                        },
                        {
                          icon: <ContentCopyIcon />,
                          label: <T>MD</T>,
                          onClick: async () => {
                            await copy(`![image alt](${publicImage.imageUrl})`);
                            addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                          },
                        },
                      ],
                    },
                  ]
                : []),
              ...(onPickImageUrl
                ? [
                    {
                      icon: <CheckIcon />,
                      buttons: [
                        {
                          icon: <CheckIcon size="small" />,
                          label: <T>pick</T>,
                          onClick: () => {
                            onPickImageUrl(publicImage);
                            addNotification({ type: NotificationType.QUIET, message: <T>picked</T> });
                          },
                        },
                      ],
                    },
                  ]
                : []),
            ]}
          />
        </div>
      ))}
    </div>
  );
};
