import { T } from '../../atoms';
import { FieldText, UserChip } from '../../organisms';
import { ProblemOwnerFieldProps } from './types';

export const ProblemOwnerField = ({
                                    record: {
                                      owner: {
                                        imageUrl,
                                        nickname,
                                        company: { key: companyKey },
                                      },
                                    },
                                  }: ProblemOwnerFieldProps) => (
  <FieldText
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">owner</T>}
  />
);
