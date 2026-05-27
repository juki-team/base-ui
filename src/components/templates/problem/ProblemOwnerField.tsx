import { T } from '../../atoms/T/T';
import { FieldText } from '../../organisms/FieldText/FieldText';
import { UserChip } from '../../organisms/UserChip/UserChip';
import type { ProblemOwnerFieldProps } from './types';

export function ProblemOwnerField({
  record: {
    owner: {
      imageUrl,
      nickname,
      organization: { key: organizationKey },
    },
  },
}: ProblemOwnerFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<UserChip nickname={nickname} imageUrl={imageUrl} organizationKey={organizationKey} />}
      label={<T className="tt-se">owner</T>}
    />
  );
}
