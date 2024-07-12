import { ContentResponseType, isObjectJson, LogDataResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { classNames } from '../../../helpers';
import { BasicModalProps, DateLiteral, Modal, T } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { UserChip } from '../UserChip';

interface ProblemLogsModalProps extends BasicModalProps {
  onClose: () => void,
  problemKey: string,
}

export const ProblemLogsModal = ({ problemKey, ...restProps }: ProblemLogsModalProps) => {
  return (
    <Modal {...restProps} closeWhenClickOutside closeWhenKeyEscape closeIcon>
      <div className="jk-pg">
        <h3><T>logs of problem</T></h3>
        <FetcherLayer<ContentResponseType<LogDataResponseDTO[]>>
          url={jukiSettings.API.problem.getLogs({ params: { key: problemKey } }).url}
        >
          {({ data }) => (
            <div>
              {data.content.map(({ timestamp, changes, customerUser }, index) => (
                <div key={index} className="jk-col stretch jk-pg-sm-tb">
                  <div className="jk-row gap center">
                    <DateLiteral date={new Date(timestamp)} />
                    <UserChip imageUrl={customerUser.imageUrl} nickname={customerUser.nickname} />
                  </div>
                  <div className="jk-col gap stretch">
                    {changes.map(({ type, valueType, oldValue, value, path }, index) => (
                      <div key={index} className="jk-row gap nowrap left">
                        <div
                          className={classNames('jk-tag tx-t', {
                            warning: type === 'UPDATE',
                            error: type === 'REMOVE',
                            success: type === 'ADD',
                          })}
                          style={{ fontFamily: 'monospace' }}
                        >
                          {type === 'ADD' ? '+' : type === 'REMOVE' ? '-' : '*'}
                        </div>
                        <div className="tx-t jk-tag gray-6">{valueType}</div>
                        <div className="tx-t jk-tag info">{path}</div>
                        <div className="jk-row gap nowrap">
                          <div className="tx-t">
                            {isObjectJson(oldValue) ? JSON.stringify(oldValue) : ''}
                          </div>
                          {'=>'}
                          <div className="tx-t">
                            {isObjectJson(value) ? JSON.stringify(value) : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </FetcherLayer>
      </div>
    </Modal>
  );
};
