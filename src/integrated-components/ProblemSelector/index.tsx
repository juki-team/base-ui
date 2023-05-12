import {
  ContentResponseType,
  ContentsResponseType,
  Judge,
  JUDGE,
  ProblemSummaryListResponseDTO,
  Status,
} from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import {
  ButtonLoader,
  DownloadIcon,
  Input,
  LoadingIcon,
  MultiSelectSearchable,
  Select,
  T,
  useNotification,
} from '../../components';
import { settings } from '../../config';
import { classNames } from '../../helpers';
import { useJukiUser } from '../../hooks';
import { authorizedRequest, cleanRequest } from '../../services';

type JudgeDataType = {
  [key in Judge]: { problems: ProblemSummaryListResponseDTO[], loading: true }
};

export interface ProblemSelectorProps {
  extend?: boolean,
  onSelect: (selectedUsers: ProblemSummaryListResponseDTO) => void
}

export const ProblemSelector = ({ onSelect, extend = false }: ProblemSelectorProps) => {
  const [ judge, setJudge ] = useState(Judge.CUSTOMER);
  const [ key, setKey ] = useState('');
  const [ data, setData ] = useState<JudgeDataType>({} as JudgeDataType);
  const { notifyResponse } = useNotification();
  const { company: { name } } = useJukiUser();
  useEffect(() => {
    const getData = async () => {
      setData(prevState => (
        { ...prevState, [judge]: { problems: prevState[judge]?.problems || [], loading: true } }
      ));
      const { url } = settings.getAPI()
        .problem
        .list({ params: { page: 1, size: 100000, filterUrl: `judge=${judge}` } });
      // TODO: change limit of problems
      const response = cleanRequest<ContentsResponseType<ProblemSummaryListResponseDTO>>(
        await authorizedRequest(url),
      );
      const problems = response.success ? response.contents || [] : [];
      setData(prevState => (
        { ...prevState, [judge]: { loading: false, problems } }
      ));
    };
    setKey('');
    getData();
  }, [ judge ]);
  
  return (
    <div className={classNames('jk-row-col gap nowrap', { extend })}>
      <Select
        options={[
          { value: Judge.CUSTOMER, label: <>{name + ' judge'}</> },
          // TODO: Add to constant or change to CompanyKey
          ...(name === 'Juki App' ? [] : [ { value: Judge.JUKI_JUDGE, label: <>{JUDGE.JUKI_JUDGE.label}</> } ]),
          { value: Judge.CODEFORCES, label: <>{JUDGE.CODEFORCES.label}</> },
        ]}
        selectedOption={{ value: judge }}
        onChange={({ value }) => setJudge(value)}
      />
      <div className="jk-col gap extend flex-1">
        <div className="jk-row nowrap gap">
          {(judge === Judge.CUSTOMER || judge === Judge.JUKI_JUDGE) && (
            <label>
              <T className="tt-se ws-np fw-bd">key</T>:&nbsp;
              <Input
                size={6}
                value={key}
                onChange={(value) => setKey(value)}
              />
            </label>
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
          <ButtonLoader
            onClick={async (setLoaderStatus) => {
              setLoaderStatus(Status.LOADING);
              const { url } = settings.getAPI()
                .problem
                .summary({ params: { judge, key } });
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
        {!data[judge] ||
        (
          data[judge]?.loading && data[judge]?.problems?.length === 0
        )
          ? <div className="jk-row flex-1" style={{ height: 34 }}><LoadingIcon /></div>
          : <MultiSelectSearchable
            options={(
              data[judge].problems
            ).map(problem => (
              {
                label: (
                  <div className="jk-row gap nowrap jk-pad-sm">
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
        }
      </div>
    </div>
  );
};
