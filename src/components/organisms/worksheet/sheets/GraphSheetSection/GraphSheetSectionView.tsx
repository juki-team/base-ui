import { GraphSheetType } from '@juki-team/commons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { Button } from '../../../../atoms';
import { ArrowBackIcon, ArrowForwardIcon } from '../../../../atoms/server';
import { GraphvizViewer } from '../../../Graphviz/GraphvizViewer';

interface GraphSheetSectionProps {
  content: GraphSheetType,
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

export const GraphSheetSectionView = ({ content, setSheet }: GraphSheetSectionProps) => {
  
  const [ frame, setFrame ] = useState(0);
  
  useEffect(() => {
    if (!content.dots.length) {
      setSheet?.(sheet => ({ ...sheet, dots: [ DEFAULT_GRAPH ] }));
    }
  }, [ frame, setSheet, content.dots.length ]);
  
  return (
    <div className="jk-col gap">
      <div className="br-g5 jk-br-ie bc-we">
        {content.dots?.[frame] && <GraphvizViewer value={content.dots[frame]} />}
      </div>
      <div className="jk-row gap center">
        <Button
          icon={<ArrowBackIcon />}
          disabled={frame === 0}
          onClick={() => setFrame(((frame - 1) + content.dots.length) % content.dots.length)}
          size="small"
        />
        {new Array(content.dots.length).fill(1).map((_, index) => (
          <div
            className={classNames('jk-tag clickable', { 'bc-g5': index !== frame })}
            onClick={() => setFrame(index)}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        <Button
          icon={<ArrowForwardIcon />}
          disabled={frame >= content.dots.length - 1}
          onClick={() => setFrame((frame + 1) % content.dots.length)}
          size="small"
        />
      </div>
    </div>
  );
};
