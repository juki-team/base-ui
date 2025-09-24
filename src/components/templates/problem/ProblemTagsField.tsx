import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { Field } from '../../organisms';
import { ProblemTagsFieldProps } from './types';

export const ProblemTagsField = ({ record: { tags }, isCard }: ProblemTagsFieldProps) => (
  <Field className={classNames('jk-row gap', { center: isCard, left: !isCard, 'jk-pg-smp': isCard })}>
    {tags.filter(tag => !!tag).map(tag => <div className="jk-tag bc-hl tx-s" key={tag}><T>{tag}</T></div>)}
  </Field>
);
