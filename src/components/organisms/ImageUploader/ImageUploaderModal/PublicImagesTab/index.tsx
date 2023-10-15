import { ContentsResponseType, ImageSummaryResponseDTO } from '@juki-team/commons';
import React from 'react';
import { settings } from '../../../../../config';
import { FetcherLayer } from '../../../../Layouts';
import { onPickImageUrlType } from '../types';
import { PublicImages } from './PublicImages';

interface PublicImagesTabProps {
  trigger: number,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
}

export const PublicImagesTab = (props: PublicImagesTabProps) => {
  
  return (
    <FetcherLayer<ContentsResponseType<ImageSummaryResponseDTO>> url={settings.getAPI().image.list().url}>
      {({ data: { contents }, mutate }) => (
        <PublicImages {...props} publicImages={contents} mutate={mutate} />
      )}
    </FetcherLayer>
  );
}
