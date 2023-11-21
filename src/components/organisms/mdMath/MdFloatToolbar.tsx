import React, { useEffect, useState } from 'react';
import { downloadBlobAsFile, handleShareMdPdf } from '../../../helpers';
import { DownloadIcon, EditIcon, OpenInNewIcon, T } from '../../atoms';
import { ButtonActionProps, FloatToolbar } from '../../molecules';

export interface MdFloatToolbarProps {
  source: string,
  edit?: boolean,
  onEdit?: () => void,
  share?: boolean,
  download?: boolean,
}

export const MdFloatToolbar = ({ source, edit, onEdit, share, download }: MdFloatToolbarProps) => {
  
  const [ sourceUrl, setSourceUrl ] = useState('');
  useEffect(() => setSourceUrl(''), [ source ]);
  
  const actionButtons: ButtonActionProps[] = [];
  if (edit && onEdit) {
    actionButtons.push({
      icon: <EditIcon />,
      buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: onEdit } ],
    });
  }
  if (share) {
    actionButtons.push({
      icon: <OpenInNewIcon />,
      buttons: [
        {
          icon: <OpenInNewIcon />,
          label: <T>save a copy</T>,
          onClick: handleShareMdPdf('md', source, sourceUrl, setSourceUrl),
        },
        {
          icon: <OpenInNewIcon />,
          label: <T>share a copy</T>,
          onClick: handleShareMdPdf('md-fullscreen', source, sourceUrl, setSourceUrl),
        },
      ],
    });
  }
  if (download) {
    actionButtons.push({
      icon: <DownloadIcon />,
      buttons: [
        {
          icon: <DownloadIcon />,
          label: <T>pdf</T>,
          onClick: handleShareMdPdf('pdf', source, sourceUrl, setSourceUrl),
        },
        {
          icon: <OpenInNewIcon />,
          label: <T>md</T>,
          onClick: async () => await downloadBlobAsFile(new Blob([ source ], { type: 'text/plain' }), 'file.md'),
        },
      ],
    });
  }
  
  return <FloatToolbar actionButtons={actionButtons} />;
};
