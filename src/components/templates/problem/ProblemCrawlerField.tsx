import { T } from '../../atoms/T/T';
import { FieldText, UserChip } from '../../organisms';
import type { ProblemCrawlerFieldProps } from './types';

export function ProblemCrawlerField({
  record: {
    owner: {
      organization: { key: organizationKey },
      imageUrl,
      nickname,
    },
  },
}: ProblemCrawlerFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<UserChip nickname={nickname} imageUrl={imageUrl} organizationKey={organizationKey} />}
      label={<T className="tt-se">crawler</T>}
    />
  );
}
