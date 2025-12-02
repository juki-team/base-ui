import { BodyWorksheetType, WorksheetType } from '@juki-team/commons';
import { Button, T } from '../../../../atoms';
import { CloseIcon, EditIcon, SaveIcon, SettingsIcon, SortIcon, VisibilityIcon } from '../../../../atoms/server';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { ButtonSizeType } from '../../../../types';
import { SetSheetType } from '../types';
import { LOGO_WORKSHEET_TYPE } from './logos';
import { upRemoveDownButtons } from './upRemoveDownActions';

interface getActionButtonsProps {
  type: WorksheetType,
  edit: boolean,
  setModal: (modal: boolean) => void,
  index: number,
  sheetLength: number,
  setSheet?: SetSheetType<BodyWorksheetType>,
  onSaveEdit?: () => void,
  onCancel?: () => void,
}

export const getActionButtons = (props: getActionButtonsProps): ButtonActionProps[] => {
  
  const {
    type,
    edit,
    index,
    sheetLength,
    setSheet,
    setModal,
    onSaveEdit,
    onCancel,
  } = props;
  
  return [
    {
      children: (
        <div className="bc-pl jk-pg-xsm jk-row cr-we gap nowrap jk-br-ie tx-t ws-np" style={{ opacity: 0.6 }}>
          {LOGO_WORKSHEET_TYPE('tiny')[type].icon}
          {LOGO_WORKSHEET_TYPE('tiny')[type].label}
        </div>
      ),
    },
    ...(onSaveEdit && onCancel ?
      edit ? [ {
          icon: <VisibilityIcon size="small" />,
          children: (
            <div className=" jk-col gap stretch">
              <Button size="small" icon={<SaveIcon />} onClick={onSaveEdit}><T className="tt-se">save</T></Button>
              <Button
                size="small"
                type="light"
                icon={<CloseIcon />}
                onClick={onCancel}
              ><T className="tt-se">cancel</T></Button>
            </div>
          ),
          placement: 'left-start',
        } as ButtonActionProps ]
        : [ {
          icon: <EditIcon size="small" />,
          children: undefined,
          onClick: onSaveEdit,
          ['data-tooltip-id']: 'jk-tooltip',
          ['data-tooltip-content']: 'edit',
          ['data-tooltip-place']: 'left',
          placement: 'left-start',
        } as ButtonActionProps ] : []),
    {
      icon: <SortIcon className="cr-we" up down />,
      size: 'tiny' as ButtonSizeType,
      buttons: upRemoveDownButtons<BodyWorksheetType>({
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
      ['data-tooltip-id']: 'jk-tooltip',
      ['data-tooltip-content']: 'view settings',
      ['data-tooltip-place']: 'left',
    } as ButtonActionProps,
  ];
};
