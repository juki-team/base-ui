import type { WorksheetType } from '@juki-team/commons/enums';
import type { BodyWorksheet } from '@juki-team/commons/types';
import { Button } from '../../../../atoms/Button/Button';
import { T } from '../../../../atoms/T/T';
import { CloseIcon } from '../../../../atoms/server/icons/google/CloseIcon';
import { EditIcon } from '../../../../atoms/server/icons/google/EditIcon';
import { SaveIcon } from '../../../../atoms/server/icons/google/SaveIcon';
import { SettingsIcon } from '../../../../atoms/server/icons/google/SettingsIcon';
import { VisibilityIcon } from '../../../../atoms/server/icons/google/VisibilityIcon';
import { SortIcon } from '../../../../atoms/server/icons/specials/SortIcon';
import type { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import type { ButtonSizeType } from '../../../../types';
import type { SetSheetType } from '../types';
import { LOGO_WORKSHEET_TYPE } from './logos';
import { upRemoveDownButtons } from './upRemoveDownActions';

interface GetActionButtonsProps {
  type: WorksheetType;
  edit: boolean;
  setModal: (modal: boolean) => void;
  index: number;
  sheetLength: number;
  setSheet?: SetSheetType<BodyWorksheet>;
  onSaveEdit?: () => void;
  onCancel?: () => void;
}

export const getActionButtons = (props: GetActionButtonsProps): ButtonActionProps[] => {
  const { type, edit, index, sheetLength, setSheet, setModal, onSaveEdit, onCancel } = props;

  return [
    {
      children: (
        <div className="bc-at-lt cr-at-it jk-pg-xsm jk-row gap nowrap jk-br-ie tx-t ws-np" style={{ opacity: 0.6 }}>
          {LOGO_WORKSHEET_TYPE('tiny')[type].icon}
          {LOGO_WORKSHEET_TYPE('tiny')[type].label}
        </div>
      ),
    },
    ...(onSaveEdit && onCancel
      ? edit
        ? [
            {
              icon: <VisibilityIcon size="small" />,
              children: (
                <div className=" jk-col gap stretch">
                  <Button size="small" icon={<SaveIcon />} onClick={onSaveEdit}>
                    <T className="tt-se">save</T>
                  </Button>
                  <Button size="small" type="secondary" icon={<CloseIcon />} onClick={onCancel}>
                    <T className="tt-se">cancel</T>
                  </Button>
                </div>
              ),
              placement: 'left-start',
            } as ButtonActionProps,
          ]
        : [
            {
              icon: <EditIcon size="small" />,
              children: undefined,
              onClick: onSaveEdit,
              'data-tooltip-id': 'jk-tooltip',
              'data-tooltip-content': 'edit',
              'data-tooltip-place': 'left',
              placement: 'left-start',
            } as ButtonActionProps,
          ]
      : []),
    {
      icon: <SortIcon className="cr-we" up down />,
      size: 'tiny' as ButtonSizeType,
      buttons: upRemoveDownButtons<BodyWorksheet>({
        index,
        length: sheetLength,
        onChange: (callback) => setSheet?.((sheet) => callback(sheet)),
      }),
      placement: 'left-start',
    },
    {
      icon: <SettingsIcon />,
      onClick: () => setModal(true),
      size: 'tiny' as ButtonSizeType,
      'data-tooltip-id': 'jk-tooltip',
      'data-tooltip-content': 'view settings',
      'data-tooltip-place': 'left',
    } as ButtonActionProps,
  ];
};
