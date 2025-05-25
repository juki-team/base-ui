import { BodyWorksheetType, WorksheetType } from '@juki-team/commons';
import React from 'react';
import { LOGO_WORKSHEET_TYPE } from '../../../../constants';
import { Button, T } from '../../../atoms';
import { ButtonType } from '../../../atoms/Button/types';
import { CloseIcon, EditIcon, SaveIcon, SettingsIcon, SortIcon, VisibilityIcon } from '../../../atoms/server';
import { SetContentType, SetSheetType } from '../types';
import { upRemoveDownButtons } from './upRemoveDownActions';

interface getActionButtonsProps<T extends BodyWorksheetType> {
  type: WorksheetType,
  edit: boolean,
  setEdit: (edit: boolean) => void,
  setModal: (modal: boolean) => void,
  content: T,
  saveContent?: SetContentType<T>,
  index: number,
  sheetLength: number,
  setSheet?: SetSheetType<BodyWorksheetType>,
  reset: () => void,
}

export const getActionButtons = <T extends BodyWorksheetType, >(props: getActionButtonsProps<T>) => {
  
  const {
    type,
    edit,
    setEdit,
    saveContent,
    content,
    index,
    sheetLength,
    setSheet,
    setModal,
    reset,
  } = props;
  
  return [
    {
      children: (
        <div className="bc-pl jk-pg-xsm jk-row cr-we gap nowrap jk-br-ie tx-t" style={{ opacity: 0.6 }}>
          {LOGO_WORKSHEET_TYPE('tiny')[type].icon}
          {LOGO_WORKSHEET_TYPE('tiny')[type].label}
        </div>
      ),
    },
    {
      icon: edit ? <VisibilityIcon size="small" /> : <EditIcon size="small" />,
      children: edit ? (
        <div className=" jk-col gap stretch">
          <Button size="small" icon={<SaveIcon />}><T className="tt-se">save</T></Button>
          <Button size="small" type="light" icon={<CloseIcon />}><T className="tt-se">cancel</T></Button>
        </div>
      ) : undefined,
      buttons: [
        {
          icon: edit ? <SaveIcon /> : <EditIcon />,
          label: <T className="tt-se">{edit ? 'save' : 'edit'}</T>,
          onClick: () => {
            setEdit(!edit);
            saveContent?.(content);
          },
        },
        ...(edit ? [
          {
            type: 'light' as ButtonType,
            icon: <CloseIcon />,
            label: <T className="tt-se">cancel</T>,
            onClick: () => {
              setEdit(!edit);
              reset();
            },
          },
        ] : []),
      ],
    },
    {
      icon: <SortIcon className="cr-we" up down />,
      buttons: upRemoveDownButtons<BodyWorksheetType>({
        index,
        length: sheetLength,
        onChange: (callback) => setSheet?.((sheet) => callback(sheet)),
      }),
    },
    {
      icon: <SettingsIcon />,
      buttons: [
        {
          icon: <SettingsIcon />,
          label: <T className="tt-se">view settings</T>,
          onClick: () => setModal(true),
        },
      ],
    },
  ];
};
