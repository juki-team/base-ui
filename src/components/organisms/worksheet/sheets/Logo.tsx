import { WorksheetType } from '@juki-team/commons';
import React, { ReactNode } from 'react';
import { ArticleIcon, ExtensionIcon } from '../../../atoms/server';

export const LOGO_WORKSHEET_TYPE: () => { [key in WorksheetType]: ReactNode } = () => ({
  [WorksheetType.JK_MD]: <ArticleIcon />,
  [WorksheetType.QUIZ_PROBLEM]: <ExtensionIcon />,
  [WorksheetType.QUIZ_TEXT]: <ExtensionIcon />,
  [WorksheetType.QUIZ_OPTIONS]: <ExtensionIcon />,
  [WorksheetType.NEW_PAGE]: <ExtensionIcon />,
  [WorksheetType.CODE_EDITOR]: <ExtensionIcon />,
  [WorksheetType.GRAPH]: <ExtensionIcon />,
  [WorksheetType.LIST]: <ExtensionIcon />,
});
