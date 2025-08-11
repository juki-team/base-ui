import { MilkdownProvider } from '@milkdown/react';
import React, { memo, useRef } from 'react';
import { MilkdownEditorContent } from './editor';
import { MdMathEditorProps } from './types';

export const MdMathEditor = memo(({
                                    md,
                                    initialMd = '',
                                    onChange,
                                    className,
                                    downloadButton,
                                  }: MdMathEditorProps) => {
  
  const initialMdRef = useRef(initialMd);
  
  return (
    <MilkdownProvider>
      <MilkdownEditorContent
        value={md ?? initialMdRef.current}
        onChange={onChange}
        className={className}
        downloadButton={downloadButton}
      />
    </MilkdownProvider>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.initialMd === nextProps.initialMd &&
    prevProps.uploadImageButton === nextProps.uploadImageButton &&
    prevProps.downloadButton === nextProps.downloadButton &&
    prevProps.className === nextProps.className
  );
});
