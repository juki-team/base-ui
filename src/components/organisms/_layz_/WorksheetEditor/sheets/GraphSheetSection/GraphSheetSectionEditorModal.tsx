import type { GraphSheet } from '@juki-team/commons/types';
import { type Dispatch, useEffect, useState } from 'react';
import { Button } from '../../../../../atoms/Button/Button';
import { Modal } from '../../../../../atoms/Modal/Modal';
import type { BasicModalProps } from '../../../../../atoms/Modal/types';
import { AddIcon } from '../../../../../atoms/server/icons/google/AddIcon';
import { ArrowBackIcon } from '../../../../../atoms/server/icons/google/ArrowBackIcon';
import { ArrowForwardIcon } from '../../../../../atoms/server/icons/google/ArrowForwardIcon';
import { DeleteIcon } from '../../../../../atoms/server/icons/google/DeleteIcon';
import { GraphSheetSectionView } from './GraphSheetSectionView';

interface GraphSheetSectionProps extends BasicModalProps {
  sheet: GraphSheet;
  setSheet: Dispatch<GraphSheet>;
  onClose: () => void;
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
  const [frame, setFrame] = useState(0);
  const [sheet, setSheet] = useState(initialSheet);

  useEffect(() => {
    if (!sheet.dots.length) {
      setSheet({ ...sheet, dots: [DEFAULT_GRAPH] });
    }
  }, [sheet, sheet.dots.length]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        _setSheet(sheet);
        onClose();
      }}
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
                const dots = [...sheet.dots];
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
                const dots = [...sheet.dots];
                dots.splice(frame, 1);
                setSheet({ ...sheet, dots });
              }}
              size="small"
              type="secondary"
            />
            <Button
              icon={<AddIcon />}
              onClick={() => {
                const dots = [...sheet.dots];
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
