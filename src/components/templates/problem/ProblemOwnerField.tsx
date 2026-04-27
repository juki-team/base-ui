import { T } from '../../atoms';
import { FieldText, UserChip } from '../../organisms';
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
