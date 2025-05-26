import { BasicWorksheetType } from '@juki-team/commons';
import React from 'react';

export const ChunkTitle = ({ content }: { content: BasicWorksheetType }) => {
  return !!content.title && (
    <h3>
      {content.title}
    </h3>
  );
};
