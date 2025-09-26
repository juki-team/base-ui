import { WorksheetType } from '@juki-team/commons';
import { ReactNode } from 'react';
import { ArticleIcon, BubbleChartIcon, CodeIcon, EventListIcon, ExtensionIcon } from '../../../../atoms/server';
import { BasicIconProps } from '../../../../atoms/server/icons/types';

export const LOGO_WORKSHEET_TYPE: (size?: BasicIconProps['size']) => {
  [key in WorksheetType]: {
    icon: ReactNode,
    label: string
  }
} = (size) => ({
  [WorksheetType.JK_MD]: { icon: <ArticleIcon size={size} />, label: 'jk md' },
  [WorksheetType.QUIZ_PROBLEM]: { icon: <ExtensionIcon size={size} />, label: 'quiz problem' },
  [WorksheetType.QUIZ_TEXT]: { icon: <ExtensionIcon size={size} />, label: 'quiz text' },
  [WorksheetType.QUIZ_OPTIONS]: { icon: <EventListIcon size={size} rotate={180} />, label: 'quiz options' },
  [WorksheetType.NEW_PAGE]: { icon: <ExtensionIcon size={size} />, label: 'new page' },
  [WorksheetType.CODE_EDITOR]: { icon: <CodeIcon size={size} />, label: 'code editor' },
  [WorksheetType.GRAPH]: { icon: <BubbleChartIcon size={size} />, label: 'graph' },
  [WorksheetType.LIST]: { icon: <ExtensionIcon size={size} />, label: 'list' },
});
