import { GraphSheetType } from '@juki-team/commons';
import React, { useState } from 'react';
import { DEFAULT_GRAPH } from '../../../../../constants';
import { classNames } from '../../../../../helpers';
import { Button, Input, T } from '../../../../atoms';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '../../../../atoms/server';
import { GraphvizEditor } from '../../../Graphviz/GraphvizEditor';
import { SetContentType } from '../../types';

interface GraphSheetSectionProps {
  content: GraphSheetType,
  setContent: SetContentType<GraphSheetType>,
}

export const GraphSheetSectionEditor = ({
                                          content,
                                          setContent,
                                        }: GraphSheetSectionProps) => {
  
  const [ frame, setFrame ] = useState(0);
  
  return (
    <div className="jk-col stretch left wh-100 jk-pg-sm br-ht jk-br-ie">
      <Input
        label={<T className="tt-se">title</T>}
        labelPlacement="top"
        value={content.title}
        onChange={title => setContent(prevState => ({ ...prevState, title }))}
        expand
      />
      {content.dots?.[frame] && (
        <GraphvizEditor
          value={content.dots[frame]}
          onSave={(dot) => {
            const dots = [ ...content.dots ];
            dots.splice(frame, 1, dot);
            setContent({ ...content, dots });
          }}
        />
      )}
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
      <div className="jk-row gap nowrap">
        <Button
          icon={<ArrowBackIcon />}
          onClick={() => {
            const dots = [ ...content.dots ];
            dots.splice(frame, 0, DEFAULT_GRAPH);
            setContent({ ...content, dots });
          }}
          size="small"
        >
          <AddIcon />
        </Button>
        <Button
          icon={<DeleteIcon />}
          onClick={() => {
            const dots = [ ...content.dots ];
            dots.splice(frame, 1);
            setContent({ ...content, dots });
          }}
          size="small"
          type="light"
        />
        <Button
          icon={<AddIcon />}
          onClick={() => {
            const dots = [ ...content.dots ];
            dots.splice(frame + 1, 0, DEFAULT_GRAPH);
            setContent({ ...content, dots });
            setFrame(frame + 1);
          }}
          size="small"
        >
          <ArrowForwardIcon />
        </Button>
      </div>
    </div>
  );
};
