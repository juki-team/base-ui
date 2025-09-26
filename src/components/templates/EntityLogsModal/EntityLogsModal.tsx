import { type ContentResponseType, isObjectJson, type LogDataResponseDTO } from '@juki-team/commons';
import { classNames } from '../../helpers';
import { DateLiteral, Modal, T } from '../../atoms';
import { FetcherLayer } from '../../molecules';
import { UserChip } from '../../organisms';
import type { EntityLogsModalProps } from './types';

export function EntityLogsModal({ url, ...restProps }: EntityLogsModalProps) {
  return (
    <Modal {...restProps} closeIcon>
      <div className="jk-pg">
        <h3><T>logs</T></h3>
        <FetcherLayer<ContentResponseType<LogDataResponseDTO[]>> url={url}>
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
                        <div className="tx-t jk-tag bc-g6">{valueType}</div>
                        <div className="tx-t jk-tag bc-io">{path}</div>
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
}
