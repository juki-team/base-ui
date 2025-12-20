import { FieldText, UserChip } from '../../organisms';
import { UserMockChip } from '../../organisms/UserChip/UserChip';
import type { SubmissionNicknameFieldProps } from './types';

export function SubmissionNicknameField({
                                          record: {
                                            user: {
                                              imageUrl,
                                              nickname,
                                              company: { key: companyKey },
                                            },
                                            hiddenSubmission,
                                          },
                                        }: SubmissionNicknameFieldProps) {
  return (
    <FieldText
      className="gap"
      text={hiddenSubmission
        ? <UserMockChip />
        : <UserChip imageUrl={imageUrl} nickname={nickname} companyKey={companyKey} />}
      label="user nickname"
    />
  );
}
