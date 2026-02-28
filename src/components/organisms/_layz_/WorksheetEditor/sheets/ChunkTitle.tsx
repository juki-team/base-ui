import { BasicWorksheet } from '@juki-team/commons';
import { MdMathViewer } from '../../../MdMathViewer/MdMathViewer';

export const ChunkTitle = ({ content }: { content: BasicWorksheet }) => {
  return !!content.title && <MdMathViewer source={content.title} />;
};
