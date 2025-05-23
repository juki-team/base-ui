import React from 'react';
import { EditIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { ListSheetRecursiveSection, ListSheetRecursiveSectionProps } from './ListSheetRecursiveSection';

interface ListSheetSectionProps extends ListSheetRecursiveSectionProps {
  actionButtons?: ButtonActionProps['buttons'],
}

export const ListSheetSection = ({ setSheet, actionButtons = [], ...props }: ListSheetSectionProps) => {
  
  const editActionButton = {
    icon: <EditIcon />,
    buttons: actionButtons,
  };
  
  return (
    <div className="jk-row stretch flex-1 sheet-section jk-br-ie relative">
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      <ListSheetRecursiveSection {...props} setSheet={setSheet} />
    </div>
  );
};
