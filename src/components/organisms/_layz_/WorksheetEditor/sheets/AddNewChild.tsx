import { BodyWorksheetType, NEW_PAGE_SHEET, WorksheetType } from '@juki-team/commons';
import {
  EMPTY_CODE_EDITOR_SHEET,
  EMPTY_GRAPH_SHEET,
  EMPTY_JK_MD_SHEET,
  EMPTY_LIST_SHEET,
  EMPTY_QUIZ_OPTIONS_SHEET,
  EMPTY_QUIZ_PROBLEM_SHEET,
} from '../../../../../constants';
import { Button, Popover, T } from '../../../../atoms';
import { PopoverProps } from '../../../../atoms/_lazy_/Popover/types';
import { PlusIcon } from '../../../../atoms/server';
import { ButtonLoader } from '../../../../molecules';
import { SetSheetType } from '../types';
import { LOGO_WORKSHEET_TYPE } from './logos';

interface AddNewChildProps<T extends BodyWorksheetType> {
  index: number,
  setSheet: SetSheetType<T>,
  mdSheet?: boolean,
  codeEditorSheet?: boolean,
  graphSheet?: boolean,
  listSheet?: boolean,
  quizProblemSheet?: boolean,
  quizOptionsSheetType?: boolean,
  pageDivider?: boolean,
  compacted?: boolean,
  floatToolbarPlacement?: PopoverProps['placement'],
}

export const AddNewChild = <T extends BodyWorksheetType, >(props: AddNewChildProps<T>) => {
  
  const {
    index,
    setSheet,
    mdSheet,
    codeEditorSheet,
    graphSheet,
    listSheet,
    quizProblemSheet,
    pageDivider,
    compacted,
    quizOptionsSheetType,
    floatToolbarPlacement,
  } = props;
  
  const actionButtons = [];
  if (mdSheet) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_JK_MD_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.JK_MD], onClick });
  }
  if (codeEditorSheet) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_CODE_EDITOR_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.CODE_EDITOR], onClick });
  }
  if (graphSheet) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_GRAPH_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.GRAPH], onClick });
  }
  if (listSheet) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_LIST_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.LIST], onClick });
  }
  if (quizProblemSheet) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_QUIZ_PROBLEM_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.QUIZ_PROBLEM], onClick });
  }
  if (quizOptionsSheetType) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, EMPTY_QUIZ_OPTIONS_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.QUIZ_OPTIONS], onClick });
  }
  if (pageDivider) {
    const onClick = () => {
      setSheet((sheet) => {
        const newSheet = [ ...sheet ];
        newSheet.splice(index + 1, 0, NEW_PAGE_SHEET() as T);
        return newSheet;
      });
    };
    actionButtons.push({ ...LOGO_WORKSHEET_TYPE('tiny')[WorksheetType.NEW_PAGE], onClick });
  }
  
  return (
    <div className="jk-row gap">
      {compacted && (
        <Popover
          content={
            <div className="jk-col gap">
              {actionButtons.map(({ icon, onClick, label }, index) => (
                <ButtonLoader
                  icon={icon}
                  key={index}
                  size="tiny"
                  expand
                  onClick={onClick}
                >
                  <T>{label}</T>
                </ButtonLoader>
              ))}
            </div>
          }
          offset={8}
          placement={floatToolbarPlacement}
        >
          <Button icon={<PlusIcon />} />
        </Popover>
      )}
      {!compacted && (
        actionButtons.map(({ icon, label, onClick }, index) => (
          <Button key={index} size="small" icon={icon} onClick={onClick}>{label}</Button>
        ))
      )}
    </div>
  );
};
