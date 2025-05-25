import React, { useState } from 'react';
import { MultiSelectSearchable } from '../../index';
import { MockupJukiProvider, mockupUsers } from '../../mockup';

export default {
  component: MultiSelectSearchable,
};

export const SelectSearchable = () => {
  const [ values, setValues ] = useState<
    { label: any; value: { nickname: string } }[]
  >([]);
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg-md">
        Select Searchable
        <br />
        {'<MultiSelectSearchable onFilter={undefined} ...'}
        <MultiSelectSearchable
          options={mockupUsers.map((option) => ({
            label: (
              <div className="jk-col">
                {option.email}
                <div>{option.nickname}</div>
              </div>
            ),
            value: option,
            disabled: Math.round(Math.random() * 10) > 7,
          }))}
          selectedOptions={values}
          onChange={(options) => setValues(options)}
          expand
        />
        Searchable
        <div style={{ width: 100 }}>
          <MultiSelectSearchable
            options={mockupUsers.map((option) => ({
              label: (
                <div className="jk-col">
                  {option.email}
                  <div>{option.nickname}</div>
                </div>
              ),
              inputLabel: <div>{option.nickname}</div>,
              value: option,
              disabled: Math.round(Math.random() * 10) > 7,
            }))}
            selectedOptions={values}
            onChange={(options) => setValues(options)}
            onFilter={({ search, option }) =>
              option.value.nickname
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            }
          />
        </div>
        Searchable
        <MultiSelectSearchable
          options={mockupUsers.map((option) => ({
            label: (
              <div className="jk-col">
                {option.email}
                <div>{option.nickname}</div>
              </div>
            ),
            inputLabel: <div>{option.nickname}</div>,
            value: option,
            disabled: Math.round(Math.random() * 10) > 7,
          }))}
          selectedOptions={values}
          onChange={(options) => setValues(options)}
          expand
          onFilter={({ search, option }) =>
            option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) >
            -1
          }
        />
        Searchable multiselect=false
        <MultiSelectSearchable
          options={mockupUsers.map((option) => ({
            label: (
              <div className="jk-col">
                {option.email}
                <div>{option.nickname}</div>
              </div>
            ),
            inputLabel: <div>{option.nickname}</div>,
            value: option,
            disabled: Math.round(Math.random() * 10) > 7,
          }))}
          selectedOptions={values}
          onChange={(options) => setValues(options)}
          expand
          onFilter={({ search, option }) =>
            option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) >
            -1
          }
          multiselect={false}
        />
        end
      </div>
    </MockupJukiProvider>
  );
};
