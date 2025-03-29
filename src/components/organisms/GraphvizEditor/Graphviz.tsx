import { graphviz, GraphvizOptions } from 'd3-graphviz';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { IGraphvizProps } from './types';

const defaultOptions: GraphvizOptions = {
  fit: true,
  height: 500,
  width: 500,
  zoom: false,
};

export const Graphviz = ({ dot, className, options = {} }: IGraphvizProps) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const instance = graphviz(containerRef.current, {
        ...defaultOptions,
        ...options,
      }).renderDot(dot);
      
      return () => {
        console.log('Graphviz out', { instance });
        // instance?.resetZoom();
      };
    }
    return () => {
    };
  }, [ dot, options.width, options.height, options.fit, options.zoom, options ]);
  
  return <div className={className} ref={containerRef} />;
};
