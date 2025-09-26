import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { Field } from '../../organisms';
import type { ProblemTagsFieldProps } from './types';

export function ProblemTagsField({ record: { tags }, isCard }: ProblemTagsFieldProps) {
  return (
    <Field className={classNames('jk-row gap', { center: isCard, left: !isCard, 'jk-pg-smp': isCard })}>
      {tags.filter(tag => !!tag).map(tag => <div className="jk-tag bc-hl tx-s" key={tag}><T>{tag}</T></div>)}
    </Field>
  );
}
