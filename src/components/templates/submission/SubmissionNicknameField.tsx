import { FieldText, UserChip } from '../../organisms';
import { UserMockChip } from '../../organisms/UserChip/UserChip';
import type { SubmissionNicknameFieldProps } from './types';

export function SubmissionNicknameField({
  record: {
    user: {
      imageUrl,
      nickname,
      organization: { key: organizationKey },
    },
    hiddenSubmission,
  },
}: SubmissionNicknameFieldProps) {
  return (
    <FieldText
      className="gap"
      text={
        hiddenSubmission ? (
          <UserMockChip />
        ) : (
          <UserChip imageUrl={imageUrl} nickname={nickname} organizationKey={organizationKey} />
        )
      }
      label="user nickname"
    />
  );
}
