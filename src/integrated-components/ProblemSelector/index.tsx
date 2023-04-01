import { ContentsResponseType, Judge, JUDGE, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { LoadingIcon, MultiSelectSearchable, Select } from '../../components';
import { settings } from '../../config';
import { classNames } from '../../helpers';
import { authorizedRequest, cleanRequest } from '../../services';

type JudgeDataType = {
  [key in Judge]: { problems: ProblemSummaryListResponseDTO[], loading: true }
};

export const ProblemSelector = ({ onSelect, extend = false }: {
  extend?: boolean,
  onSelect: (selectedUsers: Omit<Omit<ProblemSummaryListResponseDTO, 'status'>, 'judge'>) => void
}) => {
  const [ judge, setJudge ] = useState(Judge.JUKI_JUDGE);
  const [ data, setData ] = useState<JudgeDataType>({} as JudgeDataType);
  
  useEffect(() => {
    const getData = async () => {
      setData(prevState => ({ ...prevState, [judge]: { problems: prevState[judge]?.problems || [], loading: true } }));
      const { url } = settings.getAPI()
        .problem
        .list({ params: { page: 1, size: 100000, filterUrl: `judge=${judge}` } });
      // TODO: change limit of problems
      const request = cleanRequest<ContentsResponseType<ProblemSummaryListResponseDTO>>(
        await authorizedRequest(url),
      );
      const problems = request.success ? request.contents || [] : [];
      setData(prevState => ({ ...prevState, [judge]: { loading: false, problems } }));
    }
    getData();
  }, [ judge ]);
  
  return (
    <div className={classNames('jk-row-col gap nowrap', { extend })}>
      <Select
        options={[
          { value: JUDGE.JUKI_JUDGE.value, label: JUDGE.JUKI_JUDGE.label },
          { value: JUDGE.CODEFORCES.value, label: JUDGE.CODEFORCES.label },
          { value: JUDGE.AT_CODER.value, label: JUDGE.AT_CODER.label, disabled: true },
          { value: JUDGE.UVA_ONLINE_JUDGE.value, label: JUDGE.UVA_ONLINE_JUDGE.label, disabled: true },
          { value: JUDGE.CODECHEF.value, label: JUDGE.CODECHEF.label, disabled: true },
        ]}
        selectedOption={{ value: judge }}
        onChange={({ value }) => setJudge(value)}
      />
      {!data[judge] || (data[judge]?.loading && data[judge]?.problems?.length === 0)
        ? <div className="jk-row flex-1" style={{ height: 34 }}><LoadingIcon /></div>
        : <MultiSelectSearchable
          options={(data[judge].problems).map(problem => ({
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
          }))}
          selectedOptions={[].map(user => ({ value: user }))}
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
  );
};
