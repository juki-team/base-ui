import { T } from '../../../atoms';
import { downloadBlobAsFile } from '../../../helpers/commons';
import { FloatToolbar } from '../../../molecules';
import type { ButtonActionProps } from '../../../molecules/types';
import { DownloadIcon, EditIcon } from '../../../server';
import type { MdFloatToolbarProps } from './types';

export function MdFloatToolbar({ source, edit, onEdit, download }: MdFloatToolbarProps) {
  // const [ sourceUrl, setSourceUrl ] = useState('');
  // const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  // useEffect(() => setSourceUrl(''), [ source ]);

  const actionButtons: ButtonActionProps[] = [];
  if (edit && onEdit) {
    actionButtons.push({
      icon: <EditIcon size="tiny" />,
      buttons: [{ icon: <EditIcon size="tiny" />, label: <T>edit</T>, onClick: onEdit }],
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
      icon: <DownloadIcon size="tiny" />,
      buttons: [
        // TODO:
        // {
        //   icon: <DownloadIcon />,
        //   label: <T>pdf</T>,
        //   onClick: handleShareMdPdf('pdf', source, sourceUrl, setSourceUrl, userTheme),
        // },
        {
          icon: <DownloadIcon size="tiny" />,
          label: <T>md</T>,
          onClick: () => downloadBlobAsFile(new Blob([source], { type: 'text/plain' }), 'file.md'),
        },
      ],
    });
  }

  if (actionButtons.length) {
    return <FloatToolbar actionButtons={actionButtons} />;
  }

  return null;
}
