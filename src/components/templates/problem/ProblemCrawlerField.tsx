import { T } from '../../atoms';
import { FieldText, UserChip } from '../../organisms';
import type { ProblemCrawlerFieldProps } from './types';

export function ProblemCrawlerField({
                                      record: {
                                        owner: {
                                          company: { key: companyKey },
                                          imageUrl,
                                          nickname,
                                        },
                                      },
                                    }: ProblemCrawlerFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
      label={<T className="tt-se">crawler</T>}
    />
  );
}
