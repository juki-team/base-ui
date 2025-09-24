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
import { useEffect, useState } from 'react';
import { authorizedRequest, classNames, cleanRequest } from '../../../helpers';
import { useFetcher, useJukiNotification } from '../../../hooks';
import { jukiApiManager } from '../../../settings';
import { Input, Select, T } from '../../atoms';
import { ButtonLoader, MultiSelectSearchable } from '../../molecules';
import { DownloadIcon, RefreshIcon, SpinIcon } from '../../server';
import { JudgeDataType, ProblemSelectorProps } from './types';

export const ProblemSelector = ({ onSelect, extend = false, companyKey = '' }: ProblemSelectorProps) => {
  
  const [ judge, setJudge ] = useState<JudgeDataResponseDTO | null>(null);
  const [ key, setKey ] = useState('');
  const [ data, setData ] = useState<JudgeDataType>({} as JudgeDataType);
  const { notifyResponse } = useJukiNotification();
  const [ timestampTrigger, setTimestampTrigger ] = useState(0);
  const { data: judgesData } = useFetcher<ContentResponseType<JudgeDataResponseDTO[]>>(jukiApiManager.API_V1.company.getJudgeList({ params: { companyKey } }).url);
  const judges = judgesData?.success ? judgesData.content : [];
  const firstJudge = judges[0];
  
  useEffect(() => {
    if (!judge && firstJudge) {
      setJudge(firstJudge);
    }
  }, [ firstJudge, judge ]);
  
  useEffect(() => {
    const getData = async () => {
      if (judge) {
        setData(prevState => (
          { ...prevState, [judge.key]: { problems: prevState[judge.key]?.problems || [], loading: true } }
        ));
        const { url } = jukiApiManager.API_V1
          .problem
          .getBasicSummaryList({
            params: {
              page: 1,
              pageSize: 100000,
              filterUrl: `judgeKeys=${judge.key}`,
            },
          });
        // TODO: change limit of problems
        const response = cleanRequest<ContentsResponseType<ProblemBasicSummaryListResponseDTO>>(
          await authorizedRequest(url),
        );
        const problems = response.success ? response.contents || [] : [];
        setData(prevState => (
          { ...prevState, [judge.key]: { problems, loading: false } }
        ));
      }
    };
    setKey('');
    void getData();
  }, [ judge, timestampTrigger ]);
  
  const isValid = () => {
    if (judge?.key === Judge.CODEFORCES) {
      return {
        valid: key.split('-').filter(cad => !!cad).length !== 2,
      };
    }
    if (judge?.isExternal === false || judge?.key === Judge.JUKI_JUDGE || judge?.key === Judge.JV_UMSA) {
      return {
        valid: !!key,
      };
    }
    return {
      valid: false,
    };
  };
  
  const select = (
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
      disabled={!isValid().valid}
    >
      <T>select</T>
    </ButtonLoader>
  );
  
  return (
    <div className={classNames('jk-row-col gap nowrap', { extend })}>
      <div className="jk-col gap extend flex-1">
        <div className="jk-row nowrap gap">
          <label className="jk-row nowrap">
            <T className="tt-se ws-np fw-bd">judge</T>:&nbsp;
            <Select
              options={judges.map(judge => ({ label: judge.name, value: judge }))}
              selectedOption={{ value: judge }}
              onChange={({ value }) => setJudge(value)}
            />
          </label>
          {(judge?.isExternal === false || judge?.key === Judge.JUKI_JUDGE || judge?.key === Judge.JV_UMSA) && (
            <>
              <Input
                labelPlacement="left"
                label={<T className="tt-se ws-np">key</T>}
                size={6}
                value={key}
                onChange={(value) => setKey(value)}
              />
              {select}
            </>
          )}
          {judge?.key === Judge.CODEFORCES && (
            <>
              <Input
                labelPlacement="left"
                label={<T className="tt-se ws-np fw-bd">contest id</T>}
                size={6}
                value={key.split('-')[0] || ''}
                onChange={(value) => setKey(`${value}-${key.split('-')[1] || ''}`)}
              />
              <Input
                labelPlacement="left"
                label={<T className="tt-se ws-np fw-bd">index</T>}
                size="auto"
                value={key.split('-')[1] || ''}
                onChange={(value) => setKey(`${key.split('-')[0] || ''}-${value}`)}
              />
              {select}
            </>
          )}
        </div>
        {judge && (
          <div className="jk-row extend gap">
            {!data[judge.key]?.problems?.length
              ? <div className="jk-row flex-1" style={{ height: 34 }}><T className="tt-se">no problems</T></div>
              : <div className="jk-row flex-1">
                <MultiSelectSearchable
                  options={(
                    data[judge.key]?.problems ?? []
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
            <ButtonLoader
              type="light"
              tooltipContent="reload"
              icon={data[judge.key]?.loading ? <SpinIcon /> : <RefreshIcon />}
              onClick={() => setTimestampTrigger(Date.now())}
            />
          </div>
        )}
      </div>
    </div>
  );
};
