import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { Button, FullscreenExitIcon, FullscreenIcon, Portal, T } from '../../atoms';
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
    expandPosition,
    withoutDownloadButtons,
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
        withoutDownloadButtons={withoutDownloadButtons}
        // contest={{ index: routeParams?.index as string, color: problem.color }}
      />
    );
  }
  
  const body = (
    <SplitPane
      minSize={400}
      className={classNames('jk-problem-view-layout', { 'jk-full-screen-overlay elevation-1 jk-br-ie': expanded })}
      style={expanded ? expandPosition : {}}
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
          withoutDownloadButtons={withoutDownloadButtons}
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
                expand={twoRows}
              >
                <T>{expanded ? 'back' : 'expand'}</T>
              </Button>
            );
          }
          
          return (
            <Button
              data-tooltip-id="jk-tooltip"
              data-tooltip-content={expanded ? 'back' : 'expand'}
              data-tooltip-place="bottom-end"
              size="tiny"
              type="light"
              onClick={() => setExpanded(prevState => !prevState)}
              icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
              expand={twoRows}
            />
          );
        }}
        codeEditorSourceStoreKey={codeEditorSourceStoreKey}
      />
    </SplitPane>
  );
  
  if (expanded) {
    return (
      <Portal>
        <div className="jk-overlay jk-overlay-backdrop">
          <div style={{ position: 'absolute', ...expandPosition }} className="jk-problem-view-expanded-layout">
            {body}
          </div>
        </div>
      </Portal>
    );
  }
  
  return body;
};
