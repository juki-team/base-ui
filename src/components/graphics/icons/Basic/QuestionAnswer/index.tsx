import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import QuestionAnswer from './QuestionAnswer';

export const QuestionAnswerIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, QuestionAnswer);
};
