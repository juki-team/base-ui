import { ContentResponseType, ProblemDataResponseDTO } from '@juki-team/commons';
import React, { ReactNode, useState } from 'react';
import { classNames } from '../../../helpers';
import { jukiApiManager } from '../../../settings';
import { Modal } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { Field } from '../../organisms';
import { VoidIcon } from '../../server';
import { ProblemView } from '../ProblemView/ProblemView';
import { ProblemStatus } from './ProblemStatus';
import { ProblemNameModalFieldProps } from './types';

export const ProblemNameModalField = (props: ProblemNameModalFieldProps) => {
  
  const { record: { name, user, key, shortname }, isCard } = props;
  
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  return (
    <Field className={classNames('jk-row', { left: !isCard, center: isCard })}>
      {modal}
      <div className="jk-row nowrap">
        <div
          className={classNames('jk-row link', { 'ta-lt': !isCard })}
          onClick={() => {
            setModal(
              <Modal
                isOpen
                onClose={() => setModal(null)}
                // portalClassName="jk-modal-bc-wd jk-modal-height-expanded" // TODO:
              >
                <FetcherLayer<ContentResponseType<ProblemDataResponseDTO>>
                  url={jukiApiManager.API_V1.problem.getData({ params: { key } }).url}
                >
                  {data => (
                    <ProblemView
                      problem={data.data.content}
                      infoPlacement="name"
                      codeEditorStoreKey={data.data.content.key}
                    />
                  )}
                </FetcherLayer>
              </Modal>,
            );
          }}
        >
          {(shortname ? `[${shortname}] ` : '') + name}
        </div>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <>
            &nbsp;
            <div
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are editor"
              data-tooltip-t-class-name="tt-se ws-np"
              className="jk-row tx-s cr-py"
            >
              <VoidIcon size="small" filledSquare letter="E" />
            </div>
          </>
        )}
      </div>
    </Field>
  );
};
