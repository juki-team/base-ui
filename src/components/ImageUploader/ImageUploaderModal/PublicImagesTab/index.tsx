import { consoleWarn, ContentsResponseType } from '@juki-team/commons';
import copy from 'copy-to-clipboard';
import React, { memo, useEffect, useState } from 'react';
import { settings } from '../../../../config';
import { authorizedRequest, cleanRequest } from '../../../../services';
import { FloatToolbar } from '../../../FloatToolbar';
import { CopyIcon } from '../../../graphics';
import { LoaderLayer } from '../../../Loader';
import { NotificationType, useNotification } from '../../../Notifications';
import { T } from '../../../Translate';

export const PublicImagesTab = memo(({ trigger }: { trigger: number }) => {
  
  const [publicImages, setPublicImages] = useState<{ imageThumbnailUrl: string, imageUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handler = async () => {
      try {
        setLoading(true);
        const request = cleanRequest<ContentsResponseType<{ imageThumbnailUrl: string, imageUrl: string }>>(await authorizedRequest(...settings.JUKI_API.GET_ALL_PUBLIC_IMAGES()));
        if (request?.success) {
          setPublicImages(request.contents);
        }
        setLoading(false);
      } catch (error) {
        consoleWarn(error);
      }
    };
    handler().then(() => null);
  }, [trigger]);
  
  const { addNotification } = useNotification();
  
  return (
    <LoaderLayer loading={loading}>
      <div className="public-images-tab jk-row-gap">
        {publicImages.map((publicImage, index) => (
          <div className="thumbnail" key={publicImage.imageUrl}>
            <img src={publicImage.imageThumbnailUrl} alt={'image ' + index} />
            <FloatToolbar
              actionButtons={[
                {
                  icon: <CopyIcon />,
                  buttons: [
                    {
                      icon: <CopyIcon size="small" />, label: <T>URL</T>, onClick: () => {
                        copy(publicImage.imageUrl);
                        addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                      },
                    },
                    {
                      icon: <CopyIcon />, label: <T>MD</T>, onClick: () => {
                        copy(`![image alt](${publicImage.imageUrl})`);
                        addNotification({ type: NotificationType.QUIET, message: <T>copied</T> });
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        ))}
      </div>
    </LoaderLayer>
  );
});