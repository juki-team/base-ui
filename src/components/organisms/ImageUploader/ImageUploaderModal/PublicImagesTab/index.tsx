import { ContentsResponseType, ImageSummaryResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiApiSocketManager } from '../../../../../settings';
import { FetcherLayer } from '../../../../molecules';
import { onPickImageUrlType } from '../types';
import { PublicImages } from './PublicImages';

interface PublicImagesTabProps {
  trigger: number,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export const PublicImagesTab = (props: PublicImagesTabProps) => (
  <FetcherLayer<ContentsResponseType<ImageSummaryResponseDTO>>
    url={jukiApiSocketManager.API_V1.image.getPublicList().url}
    triggerFetch={props.trigger}
  >
    {({ data: { contents }, mutate }) => (
      <PublicImages publicImages={contents} copyButtons={props.copyButtons} onPickImageUrl={props.onPickImageUrl} />
    )}
  </FetcherLayer>
);
