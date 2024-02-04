import { ContentsResponseType, ImageSummaryResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../../../config';
import { FetcherLayer } from '../../../../molecules';
import { onPickImageUrlType } from '../types';
import { PublicImages } from './PublicImages';

interface PublicImagesTabProps {
  trigger: number,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export const PublicImagesTab = (props: PublicImagesTabProps) => {
  
  return (
    <FetcherLayer<ContentsResponseType<ImageSummaryResponseDTO>> url={jukiSettings.API.image.getList().url}>
      {({ data: { contents }, mutate }) => (
        <PublicImages {...props} publicImages={contents} mutate={mutate} />
      )}
    </FetcherLayer>
  );
}
