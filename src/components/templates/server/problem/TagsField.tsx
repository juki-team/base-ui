import { T } from '../../../atoms/T/T.server';
import { classNames } from '../../../helpers/commons';
import type { TagsFieldProps } from '../../problem/types';

export function TagsField({ record: { tags }, isCard }: TagsFieldProps) {
  return (
    <div className={classNames('jk-table-field jk-row gap', { center: isCard, left: !isCard, 'jk-pg-smp': isCard })}>
      {tags.filter(Boolean).map((tag) => (
        <div className="jk-tag bc-ht-lt tx-s" key={tag}>
          <T>{tag}</T>
        </div>
      ))}
    </div>
  );
}
