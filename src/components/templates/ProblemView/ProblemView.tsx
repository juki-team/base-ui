import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { Button, FullscreenExitIcon, FullscreenIcon, T } from '../../atoms';
import { SplitPane } from '../../molecules';
import { ProblemCodeEditor } from './ProblemCodeEditor';
import { ProblemStatementView } from './ProblemStatementView';
import { ProblemViewProps } from './types';

export const ProblemView = <T, >(props: ProblemViewProps<T>) => {
  
  const {
    problem,
    codeEditorCenterButtons,
    codeEditorSourceStoreKey,
    infoPlacement,
    withoutName,
    forPrinting,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const [ expanded, setExpanded ] = useState(false);
  
  if (forPrinting) {
    return (
      <ProblemStatementView
        problem={problem}
        withoutName={expanded ? false : withoutName}
        infoPlacement={infoPlacement}
        forPrinting={!!forPrinting}
        // contest={{ index: routeParams?.index as string, color: problem.color }}
      />
    );
  }
  
  return (
    <SplitPane
      minSize={400}
      className={classNames('jk-problem-view-layout', { 'jk-full-screen-overlay': expanded })}
      closableSecondPane={{
        expandLabel: <T className="label tx-t">code editor</T>,
        align: 'center',
      }}
      closableFirstPane={{
        expandLabel: <T className="label tx-t">problem statement</T>,
        align: 'center',
      }}
      onePanelAtATime={viewPortSize === 'sm'}
    >
      <div className="jk-problem-view-statement jk-pg-sm">
        <ProblemStatementView
          problem={problem}
          withoutName={expanded ? false : withoutName}
          infoPlacement={infoPlacement}
          // contest={{ index: routeParams?.index as string, color: problem.color }}
        />
      </div>
      <ProblemCodeEditor
        problem={problem}
        codeEditorCenterButtons={codeEditorCenterButtons}
        codeEditorRightButtons={({ withLabels, twoRows }) => {
          const withText = twoRows || withLabels;
          
          if (withText) {
            return (
              <Button
                size="tiny"
                type="light"
                onClick={() => setExpanded(prevState => !prevState)}
                icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
                extend={twoRows}
              >
                <T>{expanded ? 'back' : 'expand'}</T>
              </Button>
            );
          }
          
          return (
            <Button
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="back"
              data-tooltip-place="bottom-end"
              size="tiny"
              type="light"
              onClick={() => setExpanded(prevState => !prevState)}
              icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
              extend={twoRows}
            />
          );
        }}
        codeEditorSourceStoreKey={codeEditorSourceStoreKey}
      />
    </SplitPane>
  );
};
