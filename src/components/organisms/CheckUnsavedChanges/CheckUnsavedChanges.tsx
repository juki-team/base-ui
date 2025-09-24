import { CodeLanguage } from '@juki-team/commons';
import { diffLines, diffWords } from 'diff';
import microDiff from 'microdiff';
import { cloneElement, ReactElement, ReactNode, useRef, useState } from 'react';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { T } from '../../atoms';
import { TwoActionModal } from '../../molecules';
import { CodeViewer } from '../../molecules/CodeViewer/CodeViewer';
import { CheckUnsavedChangesProps } from './types';

function objectDiffAsBash(objA: any, objB: any): string {
  const changes = microDiff(objA, objB);
  let output = '';
  
  for (const change of changes) {
    const path = change.path.join('.');
    output += `  ${path}:\n`;
    
    if (change.type === 'CHANGE') {
      if (typeof change.oldValue === 'string' && typeof change.value === 'string') {
        const lineDiff = diffLines(change.oldValue, change.value);
        for (const line of lineDiff) {
          if (line.added) {
            output += `+ ${line.value.replaceAll('\n', '⏎')}\n`;
          } else if (line.removed) {
            output += `- ${line.value.replaceAll('\n', '⏎')}\n`;
          } else {
            const wordDiff = diffWords(line.value, line.value);
            for (const part of wordDiff) {
              if (part.added) {
                output += `+ ${part.value.replaceAll('\n', '⏎')}\n`;
              } else if (part.removed) {
                output += `- ${part.value.replaceAll('\n', '⏎')}\n`;
              } else {
                output += `  ${line.value.replaceAll('\n', '⏎')}\n`;
              }
            }
          }
        }
      } else {
        output += `- ${JSON.stringify(change.oldValue)}\n`;
        output += `+ ${JSON.stringify(change.value)}\n`;
      }
    }
    
    if (change.type === 'CREATE') {
      output += `+ ${JSON.stringify(change.value)}\n`;
    }
    
    if (change.type === 'REMOVE') {
      output += `- ${JSON.stringify(change.oldValue)}\n`;
    }
    output += '\n';
  }
  
  return output;
}

export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => {
  
  const { children, onClickContinue, value } = props;
  
  const originalValueRef = useRef(value);
  const [ modal, setModal ] = useState<ReactNode>(null);
  const playWarning = useSoundStore(state => state.playWarning);
  
  const handleOnClick = () => {
    const differences = microDiff(originalValueRef.current, value);
    if (JSON.stringify(originalValueRef.current) === JSON.stringify(value) || Object.keys(differences).length === 0) {
      onClickContinue();
    } else {
      playWarning();
      setModal(
        <TwoActionModal
          isOpen
          title={<T className="tt-se">attention</T>}
          primary={{ onClick: () => setModal(null), label: <T className="tt-se">close</T> }}
          secondary={{ onClick: onClickContinue, label: <T className="tt-se">continue without saving</T> }}
          onClose={() => setModal(null)}
        >
          <div>
            <T className="tt-se">there are unsaved changes</T>:
            <div className="alert-modal-json-viewer jk-br-ie">
              <CodeViewer
                code={objectDiffAsBash(originalValueRef.current, value)}
                language={CodeLanguage.DIFF}
                maxHeight="calc(var(--modal-max-height) - var(--size-large-icon) - (var(--font-size-h3) * var(--line-height-head)) - (var(--pad-md) *2) - (var(--gap) * 4) - var(--text-medium-height) - (var(--text-medium-height) * 2))"
              />
            </div>
          </div>
        </TwoActionModal>,
      );
    }
  };
  
  return (
    <>
      {modal}
      {cloneElement(children, { onClick: handleOnClick } as ReactElement<{}>['props'])}
    </>
  );
};
