import React from 'react';
import { T } from '../../atoms';
import { TextField, UserChip } from '../../organisms';
import { ProblemCrawlerFieldProps } from './types';

export const ProblemCrawlerField = ({
                                      record: {
                                        owner: {
                                          company: { key: companyKey },
                                          imageUrl,
                                          nickname,
                                        },
                                      },
                                    }: ProblemCrawlerFieldProps) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
);
