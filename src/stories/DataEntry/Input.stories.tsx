import { configureActions } from '@storybook/addon-actions';
import React, { useState } from 'react';
import {
  Color,
  ColorPicker as ColorPickerComponent,
  Input,
  InputCheckbox as CheckboxComponent,
  InputDate,
  InputPassword,
  InputSubmit,
  InputToggle,
  MultiSelect as MultiSelectComponent,
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

export const Text = () => {
  const [text, setText] = useState('');
  return <div style={{ width: '90%' }}>
    <div className="jk-divider">simple input</div>
    <Input value={text} onChange={(value) => setText(value)} />
  </div>;
};

export const Form = () => {
  const [text, setText] = useState('');
  return <div style={{ width: '90%' }}>
    <div className="jk-form-item">
      <label>
        label input
        <Input name="nickname" onChange={(value) => setText(value)} value={text} />
      </label>
    </div>
    <div className="jk-form-item">
      <label>
        label input with error label
        <Input name="nickname" onChange={(value) => setText(value)} value={text} />
      </label>
      <p>error label</p>
    </div>
    <div className="jk-form-item">
      <label>
        label input with placeholder
        <Input name="nickname" placeholder="this is a placeholder" onChange={(value) => setText(value)} value={text} />
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
        />
      </label>
      <p>error label</p>
    </div>
  </div>;
};

export const Submit = () => {
  return <div style={{ width: '90%' }}>
    <InputSubmit />
  </div>;
};

export const Checkbox = () => {
  
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="jk-row left">
      <div className="jk-col gap stretch">
        <CheckboxComponent checked={true} name="test" onChange={_ => null} label="checked" />
        <CheckboxComponent checked={false} name="test" onChange={_ => null} label="no checked" />
        <CheckboxComponent checked={checked} name="test" onChange={(value) => setChecked(value)} label="label of checkbox" />
        <CheckboxComponent checked={checked} name="test" onChange={(value) => setChecked(value)} />
        <CheckboxComponent checked={checked} name="test" label="disabled checkbox" />
      </div>
      
      {/*<CheckboxList*/}
      {/*  options={[{ value: 1, label: 'uno' }]}*/}
      {/*  selectedOptions={[{ value: 1 }]}*/}
      {/*  onSelectOptions={options => setValues(prevState => ({ ...prevState, [columnIndex]: options }))}*/}
      {/*/>*/}
    </div>
  );
};

export const Toggle = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="jk-row left">
      <div className="jk-col gap">
        <InputToggle checked={checked} onChange={(value) => setChecked(value)} />
        <InputToggle checked={checked} onChange={(value) => setChecked(value)} type="square" />
        <InputToggle checked={checked} onChange={(value) => setChecked(value)} leftLabel="left label" rightLabel="right label" />
      </div>
    </div>
  );
};

export const Select = () => {
  
  const [value, setValue] = useState<{ label: string, value: number }>({ label: 'test 20', value: 20 });
  
  let numbers = new Array(40).fill(0);
  const options: { label: string, value: number, disabled: boolean }[] = numbers.map((_, option) => ({
    label: 'label ' + option,
    inputLabel: 'LABEL' + option,
    value: option,
    disabled: (Math.round(Math.random() * 10)) > 7,
  }));
  
  return (
    <div style={{ width: '90%' }}>
      Text 1
      <SelectComponent
        className=""
        options={options}
        selectedOption={value}
        onChange={({ value, label }: { value: number, label: string }) => setValue({ value, label })}
      />
      Text 2
    </div>
  );
};

export const MultiSelect = () => {
  
  const [values, setValues] = useState<{ label: string, value: number }[]>([{ label: 'test 20', value: 20 }]);
  
  let options = new Array(40).fill(0);
  options = options.map((_, index) => index);
  
  return (
    <div style={{ width: '90%' }}>
      Text 1
      <MultiSelectComponent
        options={options.map(option => ({
          label: 'label ' + option,
          inputLabel: 'label sel ' + option,
          value: option,
          disabled: (Math.round(Math.random() * 10)) > 7,
        }))}
        selectedOptions={values}
        onChange={options => setValues(options)}
      />
      Text 2
      <MultiSelectComponent
        options={options.map(option => ({
          label: 'label ' + option,
          inputLabel: 'label sel ' + option,
          value: option,
          disabled: (Math.round(Math.random() * 10)) > 7,
        }))}
        selectedOptions={values}
        onChange={options => setValues(options)}
        block
      />
    </div>
  );
};

export const SelectSearchable = () => {
  
  const [values, setValues] = useState<{ label: any, value: { nickname: string } }[]>([]);
  
  return (
    <div>
      Text 2
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
        block
      />
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
        block
        onFilter={({ search, option }) => option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1}
      />
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
        block
        onFilter={({ search, option }) => option.value.nickname.toLowerCase().indexOf(search.toLowerCase()) > -1}
        multiselect={false}
      />
    </div>
  );
};

export const ColorPicker = () => {
  const [color, setColor] = useState<Color>();
  
  return (
    <div>
      <ColorPickerComponent color={color} onChange={color => {
        console.info(color);
        setColor(color);
      }} />
    </div>
  );
};

export const DatePicker = () => {
  
  const [date, setDate] = useState(new Date());
  
  return (
    <div className="jk-col gap">
      <TimePicker
        baseDate={new Date()}
        onChange={(...props) => console.log(props)}
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
    </div>
  );
};
