import { graphviz, GraphvizOptions } from 'd3-graphviz';
import * as React from 'react';
import { useEffect, useId } from 'react';
import { IGraphvizProps } from './types';

const defaultOptions: GraphvizOptions = {
  fit: true,
  height: 500,
  width: 500,
  zoom: false,
};

export const Graphviz = ({ dot, className, options = {} }: IGraphvizProps) => {
  const id = useId();
  
  useEffect(() => {
    graphviz(`#${id}`, {
      ...defaultOptions,
      ...options,
    }).renderDot(dot);
  }, [ dot, options ]);
  
  return <div className={className} id={id} />;
};
