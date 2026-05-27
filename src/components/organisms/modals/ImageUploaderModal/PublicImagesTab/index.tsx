import type { ImageSummaryResponseDTO } from '@juki-team/commons/dto';
import type { ContentsResponse } from '@juki-team/commons/types';
import { jukiApiManager } from '../../../../../settings';
import { FetcherLayer } from '../../../../molecules/FetcherLayer/FetcherLayer';
import type { OnPickImageUrlType } from '../types';
import { PublicImages } from './PublicImages';

interface PublicImagesTabProps {
  trigger: number;
  copyButtons?: boolean;
  onPickImageUrl?: OnPickImageUrlType;
}

export const PublicImagesTab = (props: PublicImagesTabProps) => (
  <FetcherLayer<ContentsResponse<ImageSummaryResponseDTO>>
    url={jukiApiManager.apiV2.image.getPublicList().url}
    triggerFetch={props.trigger}
  >
    {({ data: { contents } }) => (
      <PublicImages publicImages={contents} copyButtons={props.copyButtons} onPickImageUrl={props.onPickImageUrl} />
    )}
  </FetcherLayer>
);
