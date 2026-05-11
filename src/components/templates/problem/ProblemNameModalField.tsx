import type { ProblemDataResponseDTO } from '@juki-team/commons/dto';
import type { ContentResponse } from '@juki-team/commons/types';
import { type ReactNode, useState } from 'react';
import { jukiApiManager } from '../../../settings';
import { Div, Modal } from '../../atoms';
import { classNames } from '../../helpers';
import { FetcherLayer } from '../../molecules';
import { VoidIcon } from '../../server';
import { ProblemView } from '../ProblemView/ProblemView';
import { ProblemStatus } from '../server/ProblemStatus/ProblemStatus';
import type { ProblemNameModalFieldProps } from './types';

export function ProblemNameModalField(props: ProblemNameModalFieldProps) {
  const {
    record: { name, user, key, shortname },
    isCard,
  } = props;

  const [modal, setModal] = useState<ReactNode>(null);

  return (
    <div className={classNames('jk-table-field jk-row', { left: !isCard, center: isCard })}>
      {modal}
      <div className="jk-row nowrap">
        <Div
          className={classNames('jk-row link', { 'ta-lt': !isCard })}
          onClick={() => {
            setModal(
              <Modal
                isOpen
                onClose={() => setModal(null)}
                // portalClassName="jk-modal-bc-wd jk-modal-height-expanded" // TODO:
              >
                <FetcherLayer<ContentResponse<ProblemDataResponseDTO>>
                  url={jukiApiManager.apiV2.problem.getData({ params: { key } }).url}
                >
                  {(data) => (
                    <ProblemView problem={data.data.content} infoPlacement="name" codeEditorStoreKey={data.data.content.key} />
                  )}
                </FetcherLayer>
              </Modal>,
            );
          }}
          onKeyDownClick
        >
          {(shortname ? `[${shortname}] ` : '') + name}
        </Div>
        {(user.tried || user.solved) && <>&nbsp;</>}
        <ProblemStatus {...user} size="small" />
        {user.isManager && (
          <>
            &nbsp;
            <div
              data-tooltip-id="jk-tooltip"
              data-tooltip-content="you are editor"
              data-tooltip-t-class-name="tt-se ws-np"
              className="jk-row tx-s cr-tx-ht"
            >
              <VoidIcon size="small" filledSquare letter="E" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
