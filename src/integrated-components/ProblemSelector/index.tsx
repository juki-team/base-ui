import { ContentsResponseType, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { LoadingIcon, MultiSelectSearchable } from '../../components';
import { settings } from '../../config';
import { useFetcher } from '../../hooks';

export const ProblemSelector = ({ onSelect }: { onSelect: (selectedUsers: Omit<Omit<ProblemSummaryListResponseDTO, 'status'>, 'judge'>) => void }) => {
  // TODO: change limit of problems
  const { isLoading, data } = useFetcher<ContentsResponseType<ProblemSummaryListResponseDTO>>(
    settings.getAPI().problem.list({ params: { page: 1, size: 100000 } }).url,
  );
  
  if (isLoading) {
    return <div><LoadingIcon /></div>;
  }
  
  return (
    <MultiSelectSearchable
      options={(data?.success ? data?.contents : []).map(problem => ({
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
            {problem.key} {problem.name} {problem.tags?.map(tag => <div className="jk-tag gray-6" key={tag}>{tag}</div>)}
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
  );
};
