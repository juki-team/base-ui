import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import QuestionAnswer from './QuestionAnswer';

export const QuestionAnswerIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, QuestionAnswer);
};
