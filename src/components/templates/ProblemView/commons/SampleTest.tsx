import type { ProblemSampleCases } from '@juki-team/commons/types';
import { CopyToClipboard } from '../../../atoms';
import { NewlineInfo } from '../../../molecules/InformationPopover/NewlineInfo';

interface SampleTestProps {
  index: number;
  sampleCases: ProblemSampleCases;
  withPE: boolean;
  forPrinting: boolean;
}

export const SampleTest = ({ index, sampleCases, withPE, forPrinting }: SampleTestProps) => {
  const sample = sampleCases?.[index] || { input: '', output: '' };

  return (
    <div className="jk-row stretch gap">
      <div className="jk-row block stretch gap flex-1">
        <div className="jk-row nowrap left stretch gap bc-ht-lt jk-br-ie">
          <div className="sample-text-content jk-br-ie">
            <div className="jk-row gap sample-text-icons">
              {!forPrinting && withPE && <NewlineInfo text={sample.input} />}
              {!forPrinting && <CopyToClipboard text={sample.input} iconSize="tiny" className="small" />}
            </div>
            <span>{sample.input}</span>
          </div>
        </div>
        <div className="jk-row nowrap left stretch gap bc-ht-lt jk-br-ie">
          <div className="sample-text-content jk-br-ie">
            <div className="jk-row gap sample-text-icons">
              {!forPrinting && withPE && <NewlineInfo text={sample.output} />}
              {!forPrinting && <CopyToClipboard text={sample.output} iconSize="tiny" className="small" />}
            </div>
            <span>{sample.output}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
