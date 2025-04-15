import React from 'react';
import { downloadBlobAsFile } from '../../../../helpers';
import { T } from '../../../atoms';
import { FloatToolbar } from '../../../molecules';
import { ButtonActionProps } from '../../../molecules/types';
import { DownloadIcon, EditIcon, OpenInNewIcon } from '../../../server';
import { MdFloatToolbarProps } from './types';

export const MdFloatToolbar = ({ source, edit, onEdit, download }: MdFloatToolbarProps) => {
  
  // const [ sourceUrl, setSourceUrl ] = useState('');
  // const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  // useEffect(() => setSourceUrl(''), [ source ]);
  
  const actionButtons: ButtonActionProps[] = [];
  if (edit && onEdit) {
    actionButtons.push({
      icon: <EditIcon />,
      buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: onEdit } ],
    });
  }
  // if (share) {
  //   actionButtons.push({
  //     icon: <OpenInNewIcon />,
  //     buttons: [
  //       {
  //         icon: <OpenInNewIcon />,
  //         label: <T>save a copy</T>,
  //         onClick: handleShareMdPdf('md', source, sourceUrl, setSourceUrl),
  //       },
  //       {
  //         icon: <OpenInNewIcon />,
  //         label: <T>share a copy</T>,
  //         onClick: handleShareMdPdf('md-fullscreen', source, sourceUrl, setSourceUrl),
  //       },
  //     ],
  //   });
  // }
  if (download) {
    actionButtons.push({
      icon: <DownloadIcon />,
      buttons: [
        // TODO:
        // {
        //   icon: <DownloadIcon />,
        //   label: <T>pdf</T>,
        //   onClick: handleShareMdPdf('pdf', source, sourceUrl, setSourceUrl, userTheme),
        // },
        {
          icon: <OpenInNewIcon />,
          label: <T>md</T>,
          onClick: () => downloadBlobAsFile(new Blob([ source ], { type: 'text/plain' }), 'file.md'),
        },
      ],
    });
  }
  
  return <FloatToolbar actionButtons={actionButtons} />;
};
