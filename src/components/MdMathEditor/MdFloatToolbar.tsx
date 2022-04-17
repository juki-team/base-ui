import React, { useEffect, useState } from 'react';
import { downloadBlobAsFile, handleShareMdPdf } from '../../helpers';
import { FloatToolbar } from '../FloatToolbar';
import { ButtonActionProps } from '../FloatToolbar/types';
import { DownloadIcon, EditIcon, ExternalIcon } from '../graphics';
import { T } from '../Translate';

export interface MdFloatToolbarProps {
  source: string,
  edit?: boolean,
  onEdit?: () => void,
  share?: boolean,
  download?: boolean,
}

export const MdFloatToolbar = ({ source, edit, onEdit, share, download }: MdFloatToolbarProps) => {
  
  const [sourceUrl, setSourceUrl] = useState('');
  useEffect(() => setSourceUrl(''), [source]);
  
  const actionButtons: ButtonActionProps[] = [];
  if (edit && onEdit) {
    actionButtons.push({
      icon: <EditIcon />,
      buttons: [{ icon: <EditIcon />, label: <T>edit</T>, onClick: onEdit }],
    });
  }
  if (share) {
    actionButtons.push({
      icon: <ExternalIcon />,
      buttons: [
        {
          icon: <ExternalIcon />,
          label: <T>save a copy</T>,
          onClick: handleShareMdPdf('md', source, sourceUrl, setSourceUrl),
        },
        {
          icon: <ExternalIcon />,
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
          icon: <ExternalIcon />,
          label: <T>md</T>,
          onClick: async () => await downloadBlobAsFile(new Blob([source], { type: 'text/plain' }), 'file.md'),
        },
      ],
    });
  }
  
  return <FloatToolbar actionButtons={actionButtons} />;
};
