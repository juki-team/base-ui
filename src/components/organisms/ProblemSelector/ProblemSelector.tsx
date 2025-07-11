import {
  ContentResponseType,
  ContentsResponseType,
  Judge,
  JudgeDataResponseDTO,
  PROBLEM_TYPE,
  ProblemBasicSummaryListResponseDTO,
  ProblemSummaryListResponseDTO,
  Status,
} from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { authorizedRequest, classNames, cleanRequest } from '../../../helpers';
import { useFetcher } from '../../../hooks/useFetcher';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { jukiApiManager } from '../../../settings';
import { Input, Select, T } from '../../atoms';
import { ButtonLoader, MultiSelectSearchable } from '../../molecules';
import { DownloadIcon, RefreshIcon, SpinIcon } from '../../server';
import { JudgeDataType, ProblemSelectorProps } from './types';

export const ProblemSelector = ({ onSelect, extend = false, companyKey = '' }: ProblemSelectorProps) => {
  
  const [ judge, setJudge ] = useState('');
  const [ key, setKey ] = useState('');
  const [ data, setData ] = useState<JudgeDataType>({} as JudgeDataType);
  const { notifyResponse } = useJukiNotification();
  const [ timestampTrigger, setTimestampTrigger ] = useState(0);
  const { data: judgesData } = useFetcher<ContentResponseType<JudgeDataResponseDTO[]>>(jukiApiManager.API_V1.company.getJudgeList({ params: { companyKey } }).url);
  const judges = judgesData?.success ? judgesData.content : [];
  const firstJudgeKey = judges[0]?.key;
  
  useEffect(() => {
    if (!judge && firstJudgeKey) {
      setJudge(firstJudgeKey);
    }
  }, [ firstJudgeKey, judge ]);
  
  useEffect(() => {
    const getData = async () => {
      setData(prevState => (
        { ...prevState, [judge]: { problems: prevState[judge]?.problems || [], loading: true } }
      ));
      const { url } = jukiApiManager.API_V1
        .problem
        .getBasicSummaryList({
          params: {
            page: 1,
            pageSize: 100000,
            filterUrl: `judgeKeys=${judge}`,
          },
        });
      // TODO: change limit of problems
      const response = cleanRequest<ContentsResponseType<ProblemBasicSummaryListResponseDTO>>(
        await authorizedRequest(url),
      );
      const problems = response.success ? response.contents || [] : [];
      setData(prevState => (
        { ...prevState, [judge]: { problems, loading: true } }
      ));
    };
    setKey('');
    void getData();
  }, [ judge, timestampTrigger ]);
  
  return (
    <div className={classNames('jk-row-col gap nowrap', { extend })}>
      <div className="jk-col gap extend flex-1">
        <div className="jk-row nowrap gap">
          <Select
            options={judges.map(judge => ({ label: judge.name, value: judge.key }))}
            selectedOption={{ value: judge }}
            onChange={({ value }) => setJudge(value)}
          />
          {(judge === Judge.CUSTOMER || judge === Judge.JUKI_JUDGE) && (
            <Input
              labelPlacement="left"
              label={<T className="tt-se ws-np">key</T>}
              size={6}
              value={key}
              onChange={(value) => setKey(value)}
            />
          )}
          {judge === Judge.CODEFORCES && (
            <>
              <label>
                <T className="tt-se ws-np fw-bd">contest id</T>:&nbsp;
                <Input
                  size={6}
                  value={key.split('-')[0] || ''}
                  onChange={(value) => setKey(prevState => `${value}-${key.split('-')[1] || ''}`)}
                />
              </label>
              <label className="jk-row nowrap">
                <T className="tt-se ws-np fw-bd">index</T>:&nbsp;
                <Input
                  size="auto"
                  value={key.split('-')[1] || ''}
                  onChange={(value) => setKey(prevState => `${key.split('-')[0] || ''}-${value}`)}
                />
              </label>
            </>
          )}
          {judge === Judge.JV_UMSA && (
            <label>
              <T className="tt-se ws-np fw-bd">key</T>:&nbsp;
              <Input
                size={6}
                value={key}
                onChange={(value) => setKey(value)}
              />
            </label>
          )}
          <ButtonLoader
            onClick={async (setLoaderStatus) => {
              setLoaderStatus(Status.LOADING);
              const { url } = jukiApiManager.API_V1
                .problem
                .getSummary({ params: { key } });
              const response = cleanRequest<ContentResponseType<ProblemSummaryListResponseDTO>>(
                await authorizedRequest(url),
              );
              if (response.success) {
                onSelect(response.content);
                setLoaderStatus(Status.SUCCESS);
              } else {
                notifyResponse(response, setLoaderStatus);
              }
            }}
            size="tiny"
            icon={<DownloadIcon />}
            disabled={judge === Judge.CODEFORCES ? (key.split('-').filter(cad => !!cad).length !== 2) : !key}
          >
            <T>select</T>
          </ButtonLoader>
        </div>
        <div className="jk-row extend gap">
          {!data[judge] ||
          (
            data[judge]?.loading && data[judge]?.problems?.length === 0
          )
            ? <div className="jk-row flex-1" style={{ height: 34 }}><SpinIcon /></div>
            : <div className="jk-row flex-1">
              <MultiSelectSearchable
                options={(
                  data[judge].problems
                ).map(problem => (
                  {
                    label: (
                      <div className="jk-row stretch gap nowrap jk-pg-xsm-tb left ht-100">
                        <div className="jk-col gap">
                          <span className="fw-br cr-py">{problem.key}</span>
                          <span style={{ fontFamily: 'monospace' }} className="tx-t">{problem.shortname}</span>
                        </div>
                        <div className="jk-col stretch">
                          <div className="jk-row gap left">
                            {problem.name}
                            <div className="jk-tag bc-il cr-we tx-t">{PROBLEM_TYPE[problem.settings.type].label}</div>
                          </div>
                          <div className="jk-row left gap tx-s">
                            {problem.tags?.map(tag => <div className="jk-tag bc-hl" key={tag}>{tag}</div>)}
                          </div>
                        </div>
                      
                      </div>
                    ),
                    inputLabel: (
                      <div>
                        {problem.key} {problem.name} {problem.tags?.map(tag => <div
                        className="jk-tag bc-g6"
                        key={tag}
                      >{tag}</div>)}
                      </div>
                    ),
                    value: problem,
                  }
                ))}
                selectedOptions={[].map(user => (
                  { value: user }
                ))}
                onChange={options => options[0] ? onSelect({ ...options[0].value }) : null}
                optionsPlacement="bottom"
                expand
                rowHeightOption={72}
                onFilter={({ search, option }) => {
                  const text = search.toLowerCase();
                  return (
                    option.value.name.toLowerCase().indexOf(text) > -1 ||
                    option.value.key.toLowerCase().indexOf(text) > -1 ||
                    option.value.tags.some(tag => tag.toLowerCase().indexOf(text) > -1)
                  );
                }}
                multiselect={false}
              />
            </div>
          }
          <div
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="reload"
            className="jk-row"
          >
            <div className="jk-button light only-icon">
              <RefreshIcon
                onClick={() => setTimestampTrigger(Date.now())}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
