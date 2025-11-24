import { Status } from '@juki-team/commons';
import { useState } from 'react';
import { jukiApiManager } from '../../../settings';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, Modal, T } from '../../atoms';
import { toBlob } from '../../helpers';
import { useJukiUser } from '../../hooks/useJukiUser';
import { useMutate } from '../../hooks/useMutate';
import { ButtonLoader, ImageLoaderCropper } from '../../molecules';
import type { CropImageType } from '../../molecules/types';
import type { ImageProfileModalProps } from './types';

export function ImageProfileModal({ isOpen, onClose, nickname }: ImageProfileModalProps) {
  
  const { updateUserProfileImage } = useJukiUser();
  const mutateUser = useUserStore(state => state.mutate);
  const mutate = useMutate();
  const [ cropImage, setCropImage ] = useState<CropImageType>();
  
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="jk-pg-lg jk-col gap">
        <ImageLoaderCropper
          aspect={1}
          onCropChange={setCropImage}
          rotate={0}
          scale={1}
          withRotate
          withScale
          circularCrop
        />
        <div className="jk-row right gap extend">
          <Button type="light" onClick={onClose}><T>cancel</T></Button>
          <ButtonLoader
            onClick={async (setLoader) => {
              if (cropImage?.previewCanvasRef.current) {
                const blob = (await toBlob(cropImage.previewCanvasRef.current));
                if (blob) {
                  await updateUserProfileImage({
                    params: { nickname },
                    setLoader,
                    body: blob,
                    onSuccess: async () => {
                      setLoader?.(Status.LOADING);
                      await mutateUser();
                      await mutate(jukiApiManager.API_V2.user.getProfile({ params: { nickname } }).url);
                      setLoader?.(Status.SUCCESS);
                      onClose();
                    },
                  });
                }
              }
            }}
            disabled={!cropImage || !cropImage?.previewCanvasRef.current}
          >
            <T>save image</T>
          </ButtonLoader>
        </div>
      </div>
    </Modal>
  );
}
