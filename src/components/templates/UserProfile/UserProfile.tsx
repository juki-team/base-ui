import { useJukiUI } from '../../../hooks';
import { UserProfileProps } from './types';
import { UserProfileDataContent } from './UserProfileDataContent';

export function UserProfile({ user }: UserProfileProps) {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <div className="jk-col gap">
      <div className="user-profile jk-row stretch center gap pn-re">
        <div className="jk-col top jk-pg-md">
          <Image
            src={user?.imageUrl}
            className="jk-user-profile-img elevation-1 bc-we"
            alt={user?.nickname as string}
            width={104}
            height={104}
            style={{ width: 104, height: 104 }}
          />
        </div>
        <UserProfileDataContent user={user} className="top left jk-pg-md bc-we jk-br-ie" />
      </div>
    </div>
  );
}
