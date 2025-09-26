import { GraphSheetType } from '@juki-team/commons';
import { Dispatch, useEffect, useState } from 'react';
import { Button, Modal } from '../../../../../atoms';
import { BasicModalProps } from '../../../../../atoms/Modal/types';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '../../../../../atoms/server';
import { GraphSheetSectionView } from './GraphSheetSectionView';

interface GraphSheetSectionProps extends BasicModalProps {
  sheet: GraphSheetType,
  setSheet: Dispatch<GraphSheetType>,
  onClose: () => void,
}

const DEFAULT_GRAPH = `digraaph graph_name {
  bgcolor="transparent"
  a -> b;
  b -> c;
  a -> d;
  d -> c;
  a -> c;
}`;

export const GraphSheetSectionEditorModal = ({
                                               sheet: initialSheet,
                                               setSheet: _setSheet,
                                               isOpen,
                                               onClose,
                                             }: GraphSheetSectionProps) => {
  
  const [ frame, setFrame ] = useState(0);
  const [ sheet, setSheet ] = useState(initialSheet);
  
  useEffect(() => {
    if (!sheet.dots.length) {
      setSheet({ ...sheet, dots: [ DEFAULT_GRAPH ] });
    }
  }, [ frame, sheet, sheet.dots.length ]);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        _setSheet(sheet);
        onClose();
      }}
      className="jk-modal-expanded"
      closeIcon
    >
      <div className="jk-col stretch left jk-pg-md">
        <h3>Juki Graph Editor</h3>
        <div className="jk-col gap flex-1" style={{ width: '100%' }}>
          <GraphSheetSectionView content={sheet} setSheet={setSheet} />
          <div className="jk-row gap nowrap">
            <Button
              icon={<ArrowBackIcon />}
              onClick={() => {
                const dots = [ ...sheet.dots ];
                dots.splice(frame, 0, DEFAULT_GRAPH);
                setSheet({ ...sheet, dots });
              }}
              size="small"
            >
              <AddIcon />
            </Button>
            <Button
              icon={<DeleteIcon />}
              onClick={() => {
                const dots = [ ...sheet.dots ];
                dots.splice(frame, 1);
                setSheet({ ...sheet, dots });
              }}
              size="small"
              type="light"
            />
            <Button
              icon={<AddIcon />}
              onClick={() => {
                const dots = [ ...sheet.dots ];
                dots.splice(frame + 1, 0, DEFAULT_GRAPH);
                setSheet({ ...sheet, dots });
                setFrame(frame + 1);
              }}
              size="small"
            >
              <ArrowForwardIcon />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
