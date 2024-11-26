import {
  ContentResponseType,
  ContentsResponseType,
  Judge,
  JudgeDataResponseDTO,
  ProblemSummaryListResponseDTO,
  Status,
} from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { jukiSettings } from '../../../config';
import { authorizedRequest, classNames, cleanRequest } from '../../../helpers';
import { useFetcher, useJukiNotification } from '../../../hooks';
import { DownloadIcon, Input, ReloadIcon, Select, SpinIcon, T } from '../../atoms';
import { ButtonLoader, MultiSelectSearchable } from '../../molecules';
import { JudgeDataType, ProblemSelectorProps } from './types';

export const ProblemSelector = ({ onSelect, extend = false }: ProblemSelectorProps) => {
  
  const [ judge, setJudge ] = useState<string>(Judge.JUKI_JUDGE);
  const [ key, setKey ] = useState('');
  const [ data, setData ] = useState<JudgeDataType>({} as JudgeDataType);
  const { notifyResponse } = useJukiNotification();
  const [ timestampTrigger, setTimestampTrigger ] = useState(0);
  useEffect(() => {
    const getData = async () => {
      setData(prevState => (
        { ...prevState, [judge]: { problems: prevState[judge]?.problems || [], loading: true } }
      ));
      const { url } = jukiSettings.API
        .problem
        .getSummaryList({
          params: {
            page: 1,
            pageSize: 100000,
            filterUrl: `judgeKeys=${judge}`,
          },
        });
      // TODO: change limit of problems
      const response = cleanRequest<ContentsResponseType<ProblemSummaryListResponseDTO>>(
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
  const { data: judgesData } = useFetcher<ContentResponseType<JudgeDataResponseDTO[]>>(jukiSettings.API.company.getJudgeList().url);
  const judges = judgesData?.success ? judgesData.content : [];
  
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
              const { url } = jukiSettings.API
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
                      <div className="jk-row gap nowrap jk-pg-sm">
                        <div><span className="fw-br cr-py">{problem.key}</span></div>
                        <div className="jk-col stretch">
                          {problem.name}
                          <div className="jk-row left gap">
                            {problem.tags?.map(tag => <div className="jk-tag gray-5" key={tag}>{tag}</div>)}
                          </div>
                        </div>
                      
                      </div>
                    ),
                    inputLabel: (
                      <div>
                        {problem.key} {problem.name} {problem.tags?.map(tag => <div
                        className="jk-tag gray-6"
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
                extend
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
              <ReloadIcon
                onClick={() => setTimestampTrigger(Date.now())}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
