import { BodyWorksheetType, NEW_PAGE_SHEET } from '@juki-team/commons';
import React, { Dispatch } from 'react';
import {
  EMPTY_CODE_EDITOR_SHEET,
  EMPTY_GRAPH_SHEET,
  EMPTY_JK_MD_SHEET,
  EMPTY_LIST_SHEET,
  EMPTY_QUIZ_OPTIONS_SHEET,
  EMPTY_QUIZ_PROBLEM_SHEET,
} from '../../../../constants';
import { Button, T } from '../../../atoms';
import {
  BubbleChartIcon,
  CodeIcon,
  ExtensionIcon,
  ListIcon,
  MenuBookIcon,
  NoteAddIcon,
  PlusIcon,
} from '../../../atoms/server';
import { FloatToolbar } from '../../../molecules';
import { FloatToolbarProps } from '../../../molecules/FloatToolbar/types';

interface AddNewChildProps<T extends BodyWorksheetType> {
  index: number,
  sheets: T[],
  setSheets: Dispatch<T[]>,
  mdSheet?: boolean,
  codeEditorSheet?: boolean,
  graphSheet?: boolean,
  listSheet?: boolean,
  quizProblemSheet?: boolean,
  quizOptionsSheetType?: boolean,
  pageDivider?: boolean,
  compacted?: boolean,
  floatToolbarPlacement?: FloatToolbarProps['placement'],
}

export const AddNewChild = <T extends BodyWorksheetType, >(props: AddNewChildProps<T>) => {
  
  const {
    index,
    sheets,
    setSheets,
    mdSheet,
    codeEditorSheet,
    graphSheet,
    listSheet,
    quizProblemSheet,
    pageDivider,
    compacted,
    quizOptionsSheetType,
    floatToolbarPlacement = 'top',
  } = props;
  
  const actionButtons = [];
  if (mdSheet) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_JK_MD_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <NoteAddIcon />, label: <T>+ jk md</T>, onClick });
  }
  if (codeEditorSheet) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_CODE_EDITOR_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <CodeIcon />, label: <T>+ code editor</T>, onClick });
  }
  if (graphSheet) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_GRAPH_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <BubbleChartIcon />, label: <T>+ graph</T>, onClick });
  }
  if (listSheet) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_LIST_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <ListIcon />, label: <T>+ list</T>, onClick });
  }
  if (quizProblemSheet) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_QUIZ_PROBLEM_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <ExtensionIcon />, label: <T>+ quiz problem</T>, onClick });
  }
  if (quizOptionsSheetType) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, EMPTY_QUIZ_OPTIONS_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <ExtensionIcon />, label: <T>+ quiz options</T>, onClick });
  }
  if (pageDivider) {
    const onClick = () => {
      const newSheets = [ ...sheets ];
      newSheets.splice(index + 1, 0, NEW_PAGE_SHEET() as T);
      setSheets(newSheets);
    };
    actionButtons.push({ icon: <MenuBookIcon />, label: <T>+ page divider</T>, onClick });
  }
  
  return (
    <div className="jk-row gap" style={{ maxWidth: 'calc(var(--max-width) - 500px)' }}>
      {compacted && (
        <FloatToolbar
          actionButtons={[ {
            icon: <PlusIcon />,
            buttons: actionButtons,
          } ]}
          placement={floatToolbarPlacement}
        />
      )}
      {!compacted && (
        actionButtons.map(({ icon, label, onClick }, index) => (
          <Button key={index} size="small" icon={icon} onClick={onClick}>{label}</Button>
        ))
      )}
    </div>
  );
};
