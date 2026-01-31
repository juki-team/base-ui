import { BasicWorksheetType } from '@juki-team/commons';
import { MdMathViewer } from '../../../MdMathViewer/MdMathViewer';

export const ChunkTitle = ({ content }: { content: BasicWorksheetType }) => {
  return !!content.title && <MdMathViewer source={content.title} />;
};
