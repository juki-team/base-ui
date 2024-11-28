import React, { lazy, memo, Suspense } from 'react';
import { classNames } from '../../../helpers';
import { SpinIcon } from '../../atoms';
import { GraphvizEditorProps } from './types';
import { useDotValue } from './useDotValue';

const Graphviz = lazy(() => import('./Graphviz').then(module => ({ default: module.Graphviz })));

export const GraphvizViewer = memo(({ value, className, width, height }: Omit<GraphvizEditorProps, 'onChange'>) => {
  
  const { dot, error } = useDotValue(value);
  
  return (
    <div className={classNames('jk-graphviz-viewer-container', className)}>
      <Suspense fallback={<SpinIcon />}>
        {error
          ? <div className="bc-eras jk-tag error">{error}</div>
          : <Graphviz dot={dot} className="jk-graphviz-viewer" options={{ width, height }} />}
      </Suspense>
    </div>
  );
});
