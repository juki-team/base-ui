import { ProblemSampleCasesType } from '@juki-team/commons';
import React from 'react';
import { ContentCopyIcon, CopyToClipboard, InfoIcon } from '../../atoms';

interface SampleTestProps {
  index: number,
  sampleCases: ProblemSampleCasesType,
  withPE: boolean,
  forPrinting: boolean,
}

export const SampleTest = ({ index, sampleCases, withPE, forPrinting }: SampleTestProps) => {
  
  const sample = sampleCases?.[index] || { input: '', output: '' };
  
  return (
    <div className="jk-row stretch gap">
      <div className="jk-row block stretch gap flex-1">
        <div className="jk-row nowrap left stretch gap bc-we jk-border-radius-inline">
          <div className="sample-text-content jk-border-radius-inline">
            <div className="jk-row gap sample-text-icons">
              {!forPrinting && withPE && (
                <div
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={`${sample.input.lastIndexOf('\n') === sample.input.length - 1 ? '' : 'no '}newline at end of file`}
                  data-tooltip-place="left"
                  className="jk-row"
                >
                  <InfoIcon size="small" />
                </div>
              )}
              {!forPrinting && (
                <CopyToClipboard text={sample.input}>
                  <ContentCopyIcon
                    size="small"
                    className="jk-button light only-icon"
                  />
                </CopyToClipboard>
              )}
            </div>
            <span>{sample.input}</span>
          </div>
        </div>
        <div className="jk-row nowrap left stretch gap bc-we jk-border-radius-inline">
          <div className="sample-text-content jk-border-radius-inline">
            <div className="jk-row gap sample-text-icons">
              {!forPrinting && withPE && (
                <div
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={`${sample.output.lastIndexOf('\n') === sample.output.length - 1 ? '' : 'no '}newline at end of file`}
                  data-tooltip-place="left"
                  className="newline-eof"
                >
                  <InfoIcon size="small" />
                </div>
              )}
              {!forPrinting && (
                <CopyToClipboard text={sample.output}>
                  <ContentCopyIcon
                    size="small"
                    className="jk-button light only-icon br-50-pc copy-test-icon"
                  />
                </CopyToClipboard>
              )}
            </div>
            <span>
                {sample.output}
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};
