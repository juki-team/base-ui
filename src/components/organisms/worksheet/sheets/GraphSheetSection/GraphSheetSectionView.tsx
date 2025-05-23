import { GraphSheetType } from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { Button } from '../../../../atoms';
import { ArrowBackIcon, ArrowForwardIcon } from '../../../../atoms/server';
import { GraphvizEditor } from '../../../Graphviz/GraphvizEditor';

interface GraphSheetSectionProps {
  sheet: GraphSheetType,
  setSheet?: Dispatch<SetStateAction<GraphSheetType>>,
}

const DEFAULT_GRAPH = `digraaph graph_name {
  bgcolor="transparent"
  a -> b;
  b -> c;
  a -> d;
  d -> c;
  a -> c;
}`;

export const GraphSheetSectionView = ({ sheet, setSheet }: GraphSheetSectionProps) => {
  
  const [ frame, setFrame ] = useState(0);
  
  useEffect(() => {
    if (!sheet.dots.length) {
      setSheet?.(sheet => ({ ...sheet, dots: [ DEFAULT_GRAPH ] }));
    }
  }, [ frame, setSheet, sheet.dots.length ]);
  
  return (
    <div className="jk-graph-sheet-section jk-col gap">
      <div className="br-g5 jk-br-ie">
        <GraphvizEditor
          value={sheet.dots?.[frame]}
          onChange={setSheet ? (dot) => {
            const dots = [ ...sheet.dots ];
            dots.splice(frame, 1, dot);
            setSheet({ ...sheet, dots });
          } : undefined}
        />
      </div>
      <div className="jk-row gap center">
        <Button
          icon={<ArrowBackIcon />}
          disabled={frame === 0}
          onClick={() => setFrame(((frame - 1) + sheet.dots.length) % sheet.dots.length)}
          size="small"
        />
        {new Array(sheet.dots.length).fill(1).map((_, index) => (
          <div
            className={classNames('jk-tag clickable', { 'gray-5': index !== frame })}
            onClick={() => setFrame(index)}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        <Button
          icon={<ArrowForwardIcon />}
          disabled={frame >= sheet.dots.length - 1}
          onClick={() => setFrame((frame + 1) % sheet.dots.length)}
          size="small"
        />
      </div>
    </div>
  );
};
