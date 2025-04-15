import React, { memo } from 'react';
import { classNames } from '../../../helpers';
import { Graphviz } from './Graphviz/Graphviz';
import { GraphvizViewerProps } from './types';
import { useDotValue } from './useDotValue';

export const GraphvizViewer = memo(({ value, className, width, height }: GraphvizViewerProps) => {
  
  const { dot, error } = useDotValue(value);
  
  return (
    <div className={classNames('jk-graphviz-viewer-container', className)}>
      {error
        ? <div className="bc-eras jk-tag error">{error}</div>
        : <Graphviz dot={dot} className="jk-graphviz-viewer" options={{ width, height }} />}
    </div>
  );
});
