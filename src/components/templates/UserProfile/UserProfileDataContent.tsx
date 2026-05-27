import { JUDGE } from '@juki-team/commons/constants';
import type { JudgeDataResponseDTO } from '@juki-team/commons/dto';
import type { Judge } from '@juki-team/commons/enums';
import type { ContentsResponse } from '@juki-team/commons/types';
import { jukiApiManager } from '../../../settings';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { CopyToClipboard } from '../../atoms/CopyToClipboard/CopyToClipboard';
import { LocationOnIcon } from '../../atoms/server/icons/google/LocationOnIcon';
import { MailIcon } from '../../atoms/server/icons/google/MailIcon';
import { SchoolIcon } from '../../atoms/server/icons/google/SchoolIcon';
import { classNames } from '../../helpers/commons';
import { useFetcher } from '../../hooks/useFetcher';
import type { UserProfileDataContentProps } from './types';

export function UserProfileDataContent({ user, className }: UserProfileDataContentProps) {
  const { Image, Link } = useUIStore((store) => store.components);
  const { data } = useFetcher<ContentsResponse<JudgeDataResponseDTO>>(jukiApiManager.apiV2.judge.getSummaryList().url);

  return (
    <div className={classNames('jk-col stretch', className)}>
      <div className="jk-col stretch">
        <div className="jk-row left gap nowrap">
          <h3 className="fl-tt-il">{user?.nickname}</h3>
          <CopyToClipboard text={user?.nickname} iconSize="small" />
        </div>
        <div className="cr-tx-sc">
          {user?.givenName} {user?.familyName}
        </div>
        <div className="cr-tx-mt">{user?.aboutMe}</div>
      </div>
      <div className="jk-divider tiny" />
      <div className="jk-col gap stretch">
        {(user?.city?.trim() || user?.country?.trim()) && (
          <div className="jk-row left gap">
            <LocationOnIcon />
            {user?.city}
            {user?.city && ','} {user?.country}
          </div>
        )}
        {user?.institution?.trim() && (
          <div className="jk-row left gap nowrap wb-ba">
            <SchoolIcon />
            {user?.institution}
          </div>
        )}
        <div className="jk-row left gap nowrap wb-ba">
          <MailIcon />
          {user?.email}
        </div>
      </div>
      <div className="jk-divider tiny" />
      {Object.entries(user?.handles || {})
        .filter(([judge, nickname]) => !!nickname && !!JUDGE[judge as Judge])
        .map(([judge, nickname]) => {
          const getProfileUrl = data?.success ? data.contents.find(({ key }) => key === judge)?.getProfileUrl : '';
          // oxlint-disable-next-line react-doctor/no-eval -- trusted Juki backend template (per-judge URL builder); refactor to URL-template pending backend change
          const getProfileUrlFn = new Function('userNickname', getProfileUrl || "return ''");
          const externalUrl = getProfileUrlFn(nickname) as string;

          const [w, h] = JUDGE[judge as Judge]?.logoSize || [1, 1];
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
                  <Image src={JUDGE[judge as Judge]?.logo} alt={judge} height={height} width={width} />
                </div>
                {externalUrl ? (
                  <Link href={externalUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {nickname}
                  </Link>
                ) : (
                  nickname
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
