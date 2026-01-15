import { T } from '../../atoms';
import { classNames } from '../../helpers';
import { Field } from '../../organisms';
import type { TagsFieldProps } from './types';

export function TagsField({ record: { tags }, isCard }: TagsFieldProps) {
  return (
    <Field className={classNames('jk-row gap', { center: isCard, left: !isCard, 'jk-pg-smp': isCard })}>
      {tags.filter(Boolean).map(tag => <div className="jk-tag bc-hl tx-s" key={tag}><T>{tag}</T></div>)}
    </Field>
  );
}
