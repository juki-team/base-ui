import { T } from '../../atoms';
import { FieldText, UserChip } from '../../organisms';
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
  <FieldText
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
);
