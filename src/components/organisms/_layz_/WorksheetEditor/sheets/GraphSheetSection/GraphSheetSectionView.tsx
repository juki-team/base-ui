import type { GraphSheet } from '@juki-team/commons/types';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { Button, Div } from '../../../../../atoms';
import { ArrowBackIcon, ArrowForwardIcon } from '../../../../../atoms/server';
import { classNames } from '../../../../../helpers';
import { GraphvizViewer } from '../../../GraphvizViewer';

interface GraphSheetSectionProps {
  content: GraphSheet;
  setSheet?: Dispatch<SetStateAction<GraphSheet>>;
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
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!content.dots.length) {
      setSheet?.((sheet) => ({ ...sheet, dots: [DEFAULT_GRAPH] }));
    }
  }, [frame, setSheet, content.dots.length]);

  return (
    <div className="jk-col gap">
      <div className="br-hl jk-br-ie bc-sf-md">{content.dots?.[frame] && <GraphvizViewer dot={content.dots[frame]} />}</div>
      <div className="jk-row gap center">
        <Button
          icon={<ArrowBackIcon />}
          disabled={frame === 0}
          onClick={() => setFrame((frame - 1 + content.dots.length) % content.dots.length)}
          size="small"
        />
        {new Array(content.dots.length).fill(1).map((_, index) => (
          <Div
            className={classNames('jk-tag clickable', { 'bc-sf-hi': index !== frame })}
            onClick={() => setFrame(index)}
            onKeyDownClick
            key={index}
          >
            {index + 1}
          </Div>
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
