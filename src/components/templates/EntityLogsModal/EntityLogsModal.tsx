import { isObjectJson } from '@juki-team/commons/helpers';
import type { ContentResponse, LogDataResponseDTO } from '@juki-team/commons/types';
import { Modal } from '../../atoms/Modal/Modal';
import { T } from '../../atoms/T/T';
import { DateLiteral } from '../../atoms/server/DateLiteral/DateLiteral';
import { classNames } from '../../helpers/commons';
import { FetcherLayer } from '../../molecules/FetcherLayer/FetcherLayer';
import { UserChip } from '../../organisms/UserChip/UserChip';
import type { EntityLogsModalProps } from './types';

export function EntityLogsModal({ url, ...restProps }: EntityLogsModalProps) {
  return (
    <Modal {...restProps} closeIcon>
      <div className="jk-pg">
        <h3>
          <T>logs</T>
        </h3>
        <FetcherLayer<ContentResponse<LogDataResponseDTO[]>> url={url}>
          {({ data }) => (
            <div>
              {data.content.map(({ timestamp, changes, customerUser }, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: read-only fetched logs in chronological order
                <div key={index} className="jk-col stretch jk-pg-sm-tb">
                  <div className="jk-row gap center">
                    <DateLiteral date={new Date(timestamp)} />
                    <UserChip
                      imageUrl={customerUser.imageUrl}
                      nickname={customerUser.nickname}
                      organizationKey={customerUser.organization.key}
                    />
                  </div>
                  <div className="jk-col gap stretch">
                    {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred */}
                    {changes.map(({ type, valueType, oldValue, value, path }, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: changes within a single log entry are immutable
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
                        <div className="tx-t jk-tag bc-sf-hi">{valueType}</div>
                        <div className="tx-t jk-tag bc-io">{path}</div>
                        <div className="jk-row gap nowrap">
                          <div className="tx-t">{isObjectJson(oldValue) ? JSON.stringify(oldValue) : ''}</div>
                          {'=>'}
                          <div className="tx-t">{isObjectJson(value) ? JSON.stringify(value) : ''}</div>
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
