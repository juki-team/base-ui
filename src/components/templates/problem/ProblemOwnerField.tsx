import React from 'react';
import { T } from '../../atoms';
import { TextField, UserChip } from '../../organisms';
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
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">owner</T>}
  />
);
