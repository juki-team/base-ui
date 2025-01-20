import { Status } from '@juki-team/commons';
import React, { useState } from 'react';
import { toBlob } from '../../../helpers';
import { useJukiUser, useMutate } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { Button, Modal, T } from '../../atoms';
import { BasicModalProps } from '../../atoms/types';
import { ButtonLoader, CropImageType, ImageLoaderCropper } from '../../molecules';

interface ImageProfileModalProps extends BasicModalProps {
  nickname: string,
}

export const ImageProfileModal = ({ isOpen, onClose, nickname }: ImageProfileModalProps) => {
  
  const { updateUserProfileImage, mutatePing } = useJukiUser();
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
                      await mutatePing();
                      await mutate(jukiApiSocketManager.API_V1.user.getProfile({ params: { nickname } }).url);
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
};
