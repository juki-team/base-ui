import { ContentResponseType, UserBasicResponseDTO } from '@juki-team/commons';
import { jukiApiManager } from '../../../../../settings';
import { useUIStore } from '../../../../../stores/ui/useUIStore';
import { Button, Modal, T } from '../../../../atoms';
import { BasicModalProps } from '../../../../atoms/Modal/types';
import { ButtonLoader, FetcherLayer } from '../../../../molecules';
import { OpenInNewIcon } from '../../../../server';
import { UserProfileDataContent } from '../../../../templates/UserProfile/UserProfileDataContent';

export const UserPreview = ({ user, onClose, userHref }: {
  user: UserBasicResponseDTO,
  onClose: () => void,
  userHref: string
}) => {
  
  const { Image, Link } = useUIStore(store => store.components);
  
  return (
    <div className="jk-pg-md jk-col stretch gap">
      <div className="jk-row center gap">
        <Image
          src={user?.imageUrl}
          className="jk-user-profile-img elevation-1"
          alt={user?.nickname}
          height={100}
          width={100}
        />
        <UserProfileDataContent user={user} />
      </div>
      <div className="jk-row-col gap block stretch">
        <ButtonLoader size="small" type="light" onClick={onClose}><T className="tt-se">close</T></ButtonLoader>
        <Link href={userHref} target="_blank" rel="noreferrer">
          <Button size="small" expand>
            <div className="jk-row nowrap gap"><T className="ws-np tt-se">see profile</T><OpenInNewIcon /></div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export interface UserPreviewContentModalProps extends BasicModalProps {
  nickname: string,
  companyKey?: string,
  userHref: string,
}

export const UserPreviewContentModal = ({
                                          isOpen,
                                          nickname,
                                          companyKey,
                                          onClose,
                                          userHref,
                                        }: UserPreviewContentModalProps) => {
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-user-preview"
    >
      <FetcherLayer<ContentResponseType<UserBasicResponseDTO>>
        url={jukiApiManager.API_V1.user.getSummary({ params: { nickname, companyKey } }).url}
        onError={onClose}
      >
        {({ data }) => (
          <UserPreview user={data?.content} onClose={onClose} userHref={userHref} />
        )}
      </FetcherLayer>
    </Modal>
  );
};
