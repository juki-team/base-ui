import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { MockupToggleThemeButton } from '../../components/mockup/MockupToggleThemeButton';
import {
  Color,
  DateLiteral,
  Input,
  InputColor as ColorPickerComponent,
  InputDate,
  InputPassword,
  MultiSelectSearchable,
  Select as SelectComponent,
  TextArea,
  TimePicker,
} from '../../index';
import { mockupUsers } from '../mockupUsers';

export default {
  title: 'Components/Data Entry',
  component: Input,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Form = () => {
  const [ text, setText ] = useState('');
  return (
    <div style={{ width: '90%' }} className="jk-pad-md">
      <div className="jk-form-item">
        <label>
          label input
          <Input name="nickname" onChange={(value) => setText(value)} value={text} />
        </label>
      </div>
      <div className="jk-form-item">
        <label>
          label input with error label
          <Input name="nickname" onChange={(value) => setText(value)} value={text} className="error" />
        </label>
        <p>error label</p>
      </div>
      <div className="jk-form-item">
        <label>
          label input with success label
          <Input name="nickname" onChange={(value) => setText(value)} value={text} className="success" />
        </label>
      </div>
      <div className="jk-form-item">
        <label>
          label input with placeholder
          <Input
            name="nickname" placeholder="this is a placeholder" onChange={(value) => setText(value)} value={text}
            disabled
          />
        </label>
      </div>
      <div className="jk-form-item">
        <label>
          Password
          <InputPassword name="password" onChange={(value) => setText(value)} value={text} />
        </label>
        <p>error label</p>
      </div>
      <div className="jk-form-item">
        <label>
          Text area input
          <TextArea value={text} onChange={value => setText(value)} />
        </label>
        <p>error label</p>
      </div>
      <div className="jk-form-item">
        <label>
          Text area input
          <SelectComponent
            options={[
              { value: 'select1', label: 'select 1' },
              { value: 'select2', label: 'select 2' },
              { value: 'select3', label: 'select 3' },
            ]}
            selectedOption={{ value: 'text', label: 'text selected' }}
            onChange={() => null}
            extend
            optionsPlacement="top"
          />
        </label>
        <p>error label</p>
      </div>
      <MockupToggleThemeButton />
    </div>
  );
};

export const SelectSearchable = () => {
  
  const [ values, setValues ] = useState<{ label: any, value: { nickname: string } }[]>([]);
  
  return (
    <div className="jk-pad-md">
      Select Searchable
      <br />
      {'<MultiSelectSearchable onFilter={undefined} ...'}
      <MultiSelectSearchable
        options={mockupUsers.map(option => ({
          label: <div className="jk-col">{option.email}
            <div>{option.nickname}</div>
          </div>,
          value: option,
          disabled: (Math.round(Math.random() * 10)) > 7,
        }))}
        selectedOptions={values}
        onChange={options => setValues(options)}
        extend
      />
      Searchable
      <div style={{ width: 100 }}>
        <MultiSelectSearchable
          options={mockupUsers.map(option => ({
            label: <div className="jk-col">{option.email}
              <div>{option.nickname}</div>
            </div>,
            inputLabel: <div>{option.nickname}</div>,
            value: option,
            disabled: (Math.round(Math.random() * 10)) > 7,
          }))}
          selectedOptions={values}
          onChange={options => setValues(options)}
          onFilter={({ search, option }) => option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1}
        />
      </div>
      Searchable
      <MultiSelectSearchable
        options={mockupUsers.map(option => ({
          label: <div className="jk-col">{option.email}
            <div>{option.nickname}</div>
          </div>,
          inputLabel: <div>{option.nickname}</div>,
          value: option,
          disabled: (Math.round(Math.random() * 10)) > 7,
        }))}
        selectedOptions={values}
        onChange={options => setValues(options)}
        extend
        onFilter={({ search, option }) => option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1}
      />
      Searchable multiselect=false
      <MultiSelectSearchable
        options={mockupUsers.map(option => ({
          label: <div className="jk-col">{option.email}
            <div>{option.nickname}</div>
          </div>,
          inputLabel: <div>{option.nickname}</div>,
          value: option,
          disabled: (Math.round(Math.random() * 10)) > 7,
        }))}
        selectedOptions={values}
        onChange={options => setValues(options)}
        extend
        onFilter={({ search, option }) => option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1}
        multiselect={false}
      />
      end
      <MockupToggleThemeButton />
    </div>
  );
};

export const ColorPicker = () => {
  const [ color, setColor ] = useState<Color>();
  
  return (
    <div>
      <ColorPickerComponent
        color={color} onChange={color => {
        console.info(color);
        setColor(color);
      }}
      />
      <MockupToggleThemeButton />
    </div>
  );
};

export const DatePicker = () => {
  
  const [ date, setDate ] = useState(new Date());
  
  return (
    <div className="jk-col gap">
      <TimePicker
        date={new Date()}
        onChange={(...props) => console.info(props)}
        showMinutes={true}
        showSeconds={true}
        showMilliseconds={true}
        // isSelected={isSelected}
        // isDisabled={isDisabled}
      />
      
      <InputDate
        type="year-month-day-hours-minutes-seconds-milliseconds"
        date={date}
        // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
        isDisabled={() => ({})}
        isSelected={(() => ({}))}
        baseDate={date}
        onDatePick={(date) => setDate(date)}
        twoLines
        extend
      />
      <InputDate
        type="year-month-day-hours-minutes-seconds-milliseconds"
        date={date}
        // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
        isDisabled={() => ({})}
        isSelected={(() => ({}))}
        baseDate={date}
        onDatePick={(date) => setDate(date)}
        twoLines
        inline
      />
      <MockupToggleThemeButton />
      <DateLiteral
        date={date}
        twoLines={false}
        show="year-month-day-hours-minutes-seconds-milliseconds"
        withDayName={true}
      />
    </div>
  );
};
