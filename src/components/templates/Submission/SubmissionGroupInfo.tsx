import { ProblemScoringMode, ProblemVerdict, ProfileSetting, TestCaseResultType, Theme } from '@juki-team/commons';
import * as Diff2Html from 'diff2html';
import { LineMatchingType } from 'diff2html/lib-esm/types';
import { ColorSchemeType } from 'diff2html/lib/types';
import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI, useJukiUser } from '../../../hooks';
import { Button, Modal, T, UpIcon, VirtualizedRowsFixed, VisibilityIcon } from '../../atoms';
import { VirtualizedRowsFixedProps } from '../../atoms/VirtualizedRowsFixed/types';
import { Collapse } from '../../molecules';
import { SubmissionMemory } from './SubmissionMemory';
import { SubmissionTime } from './SubmissionTime';
import { SubmissionVerdict } from './SubmissionVerdict';

export interface GroupInfoProps {
  isProblemEditor: boolean,
  groupKey: number,
  problemScoringMode: ProblemScoringMode,
  timeUsed: number,
  memoryUsed: number,
  verdict: ProblemVerdict,
  points: number,
  testCases: TestCaseResultType[],
  submitId: string,
}

const DiffViewButton = ({ diffInput, croppedDiff }: { diffInput: string, croppedDiff: boolean }) => {
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ diff, setDiff ] = useState('');
  const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  
  useEffect(() => {
    if (isOpen) {
      if (diffInput.includes('$/test-A') || diffInput.includes('$/test-B')) {
        const diffHtml = Diff2Html.html(diffInput,
          {
            drawFileList: false,
            matching: 'words' as LineMatchingType,
            renderNothingWhenEmpty: false,
            colorScheme: userTheme === Theme.DARK ? ColorSchemeType.DARK : ColorSchemeType.LIGHT,
            outputFormat: 'side-by-side',
          },
        );
        setDiff(diffHtml);
      } else {
        setDiff(diffInput);
      }
    }
  }, [ diffInput, userTheme, isOpen ]);
  
  const left = diffInput.length - diffInput.indexOf('No newline at end of file') > 26;
  
  return (
    <>
      <Button
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="view diff"
        icon={<VisibilityIcon />}
        size="tiny"
        type="light"
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} closeWhenKeyEscape closeWhenClickOutside closeIcon>
        <div className="jk-col stretch gap jk-pg-lg diff-body-modal">
          <div>
            {croppedDiff && (
              <T className="tt-se cr-er fw-bd">
                only the first 1000 characters of the difference are being displayed
              </T>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: diff }} />
          {diffInput.includes('No newline at end of file') && (
            <div className="jk-row block center">
              <div className="appearance-error">{left && <T>no newline at end of file</T>}</div>
              <div className="appearance-error">{!left && <T>no newline at end of file</T>}</div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export const SubmissionGroupInfo = (props: GroupInfoProps) => {
  
  const {
    groupKey,
    problemScoringMode,
    timeUsed,
    memoryUsed,
    verdict,
    points,
    testCases,
    submitId,
    isProblemEditor,
  } = props;
  const { viewPortSize } = useJukiUI();
  const isSmall = viewPortSize === 'sm';
  const rowHeight = isSmall ? 54 + 8 + 8 : 24 + 8 + 8;
  
  const testCasesString = JSON.stringify(testCases);
  const renderRow: VirtualizedRowsFixedProps['renderRow'] = useCallback((index) => {
    const testCases: TestCaseResultType[] = JSON.parse(testCasesString);
    const testCase = testCases[index];
    return (
      <div
        className="jk-row extend block gap jk-table-inline-row"
        key={index}
        style={{ borderBottom: '1px solid var(--t-color-gray-5)' }}
      >
        {isProblemEditor ? (
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={testCase.testCaseKey}
            data-tooltip-t-class-name="ws-np"
            className="jk-row" style={{ flex: 0.4 }}
          >
            {index + 1}
          </div>
        ) : (
          <div className="jk-row" style={{ flex: 0.4 }}>
            {index + 1}
          </div>
        )}
        <div className="jk-row gap center nowrap" style={{ flex: 2 }}>
          <SubmissionVerdict verdict={testCase.verdict} submitId={submitId} />
          {testCase.diff && (
            <DiffViewButton
              croppedDiff={testCase.croppedDiff}
              diffInput={testCase.diff.replaceAll(testCase.testCaseKey + '.judge.out', 'A').replaceAll(testCase.testCaseKey + '.out', 'B')}
            />
          )}
        </div>
        {problemScoringMode === ProblemScoringMode.PARTIAL && (
          <div className="jk-row">{testCase.points?.toFixed(3)}</div>
        )}
        <div className="jk-row center ws-np nowrap">
          <SubmissionTime verdict={testCase.verdict} timeUsed={testCase.timeUsed} />
        </div>
        <div className="jk-row center ws-np nowrap">
          <SubmissionMemory verdict={testCase.verdict} memoryUsed={testCase.memoryUsed} />
        </div>
        <div className={classNames('jk-row center gap', { 'cr-er fw-bd': testCase?.exitCode !== 0 })}>
          {testCase.exitCode}
        </div>
      </div>
    );
  }, [ isProblemEditor, problemScoringMode, submitId, testCasesString ]);
  
  return (
    <Collapse
      header={({ isOpen, toggle }) => (
        <div
          className={classNames(
            'jk-row extend block gap jk-table-inline-row jk-pg-md group-info',
            { 'fw-br': isOpen },
          )}
        >
          <div className="jk-row left nowrap">
            {!!testCases.length && <><UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />&nbsp;</>}
            {+groupKey ? (
                problemScoringMode === ProblemScoringMode.SUBTASK
                  ? <><T className="tt-se ws-np">subtask</T>&nbsp;{groupKey}</>
                  : problemScoringMode === ProblemScoringMode.PARTIAL
                    ? <><T className="tt-se ws-np">group</T>&nbsp;{groupKey}</>
                    : <T className="tt-se">test cases</T>) :
              <T className="tt-se">sample cases</T>}
          </div>
          <div className="jk-row center gap nowrap" style={{ flex: 3 }}>
            <SubmissionVerdict verdict={verdict} points={points} submitId={submitId} />
          </div>
          {(problemScoringMode === ProblemScoringMode.SUBTASK || problemScoringMode === ProblemScoringMode.PARTIAL) && (
            <div className="jk-row">{+points.toFixed(4)}</div>
          )}
          <div className="jk-row center gap">
            <SubmissionTime timeUsed={timeUsed} verdict={verdict} />
          </div>
          <div className="jk-row center gap">
            <SubmissionMemory verdict={verdict} memoryUsed={memoryUsed} />
          </div>
        </div>
      )}
      className="jk-row extend"
    >
      <div className={classNames('jk-row extend group-info-details')}>
        <div className={classNames('jk-row extend block gap jk-table-inline-row fw-bd')}>
          <div className="jk-row" style={{ flex: 0.4 }}><T>#</T></div>
          <div className="jk-row center gap" style={{ flex: 2 }}>
            <T className="tt-se">verdict</T>
          </div>
          {problemScoringMode === ProblemScoringMode.PARTIAL && (
            <div className="jk-row center gap"><T className="tt-se">points</T>
            </div>
          )}
          <div className="jk-row center gap"><T className="tt-se">time</T></div>
          <div className="jk-row center gap"><T className="tt-se">memory</T></div>
          <div className="jk-row center gap"><T className="tt-se">exit code</T></div>
        </div>
        <div
          style={{
            width: '100%',
            height: rowHeight * Math.min(testCases.length, 3) + 1,
          }}
          className={classNames({ 'top-bottom-inset-shadow': testCases.length > 3 })}
        >
          <VirtualizedRowsFixed
            size={testCases.length}
            rowHeight={rowHeight}
            renderRow={renderRow}
          />
        </div>
      </div>
    </Collapse>
  );
};
