import { T } from '../../atoms';
import { FieldText, UserChip } from '../../organisms';
import type { ProblemOwnerFieldProps } from './types';

export function ProblemOwnerField({
                                    record: {
                                      owner: {
                                        imageUrl,
                                        nickname,
                                        company: { key: companyKey },
                                      },
                                    },
                                  }: ProblemOwnerFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
      label={<T className="tt-se">owner</T>}
    />
  );
}
