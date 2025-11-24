import { type ContentsResponseType, Judge, JUDGE, type JudgeDataResponseDTO } from '@juki-team/commons';
import { jukiApiManager } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { CopyToClipboard } from '../../atoms';
import { LocationOnIcon, MailIcon, SchoolIcon } from '../../atoms/server';
import { classNames } from '../../helpers';
import { useFetcher } from '../../hooks/useFetcher';
import type { UserProfileDataContentProps } from './types';

export function UserProfileDataContent({ user, className }: UserProfileDataContentProps) {
  
  const { Image, Link } = useUIStore(store => store.components);
  const { data } = useFetcher<ContentsResponseType<JudgeDataResponseDTO>>(
    jukiApiManager.API_V2.judge.getSummaryList().url,
  );
  
  return (
    <div className={classNames('jk-col stretch', className)}>
      <div className="jk-col stretch">
        <div className="jk-row left gap nowrap">
          <h3 className="fl-tt-il">{user?.nickname}</h3>
          <CopyToClipboard text={user?.nickname} size="small" />
        </div>
        <div className="cr-g3">{user?.givenName} {user?.familyName}</div>
        <div className="cr-g1">{user?.aboutMe}</div>
      </div>
      <div className="jk-divider tiny" />
      <div className="jk-col gap stretch">
        {(user?.city?.trim() || user?.country?.trim()) && (
          <div className="jk-row left gap">
            <LocationOnIcon />{user?.city}{user?.city && ','} {user?.country}
          </div>
        )}
        {user?.institution?.trim() && (
          <div className="jk-row left gap nowrap wb-ba"><SchoolIcon />{user?.institution}</div>
        )}
        <div className="jk-row left gap nowrap wb-ba"><MailIcon />{user?.email}</div>
      </div>
      <div className="jk-divider tiny" />
      {Object.entries(user?.handles || {})
        .filter(([ judge, nickname ]) => !!nickname && !!JUDGE[judge as Judge])
        .map(([ judge, nickname ]) => {
          const getProfileUrl = data?.success ? data.contents.find(({ key }) => key === judge)?.getProfileUrl : '';
          const getProfileUrlFn = new Function('userNickname', getProfileUrl || 'return \'\'');
          const externalUrl = getProfileUrlFn(nickname) as string;
          
          let [ w, h ] = JUDGE[judge as Judge]?.logoSize || [ 1, 1 ];
          let height = (64 / w) * h;
          let width = 64;
          if (height > 32) {
            height = 32;
            width = (32 / h) * w;
          }
          
          return (
            <div className="jk-col left gap block stretch" key={judge}>
              <div className="jk-row gap">
                <div style={{ width: 64 }} className="jk-row">
                  <Image
                    src={JUDGE[judge as Judge]?.logo}
                    alt={judge}
                    height={height}
                    width={width}
                  />
                </div>
                {externalUrl ? (
                  <Link href={externalUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {nickname}
                  </Link>
                ) : nickname}
              </div>
            </div>
          );
        })}
    </div>
  );
}
