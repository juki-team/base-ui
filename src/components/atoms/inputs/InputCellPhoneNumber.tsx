import { getTimezone } from 'countries-and-timezones';
import React, { ReactNode, useId, useMemo, useState } from 'react';
import { classNames } from '../../../helpers';
import { countryFlagSvg, countryList } from '../../../modules';
import { Select } from '../Select';
import { BasicInput } from './Input';
import { InputCellPhoneNumberProps } from './types';

export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps<string>) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    onChange,
    register,
    ...inputProps
  } = props;
  
  const id = useId();
  const [ countryCode, setCountryCode ] = useState<string>(getTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)?.countries[0] as string);
  const options = useMemo(() => {
    const list = countryList.getAll();
    return list.map((country) => ({
      value: country.code,
      label: (
        <div className="jk-col">
          <div className="jk-row extend left fw-bd">{country.name}</div>
          <div className="jk-row gap nowrap">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(countryFlagSvg[country.code])}`}
              alt={country.name}
              height={24}
              width={36}
            />
            ({country.dial_code})
          </div>
        </div>
      ),
    }))
  }, []);
  
  const dialCode = countryList.findByCountryCode(countryCode)[0]?.dial_code;
  
  return (
    <div
      className={classNames(`jk-input-cell-phone-number-wrapper`, {
        extend,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      <Select<string, ReactNode, string>
        options={options}
        selectedOption={{
          value: countryCode,
          label: (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(countryFlagSvg[countryCode])}`}
              alt={countryCode}
              height={24}
              width={36}
            />
          ),
        }}
        onChange={({ value }) => setCountryCode(value)}
        popoverClassName="popover-select-cell-phone-number-wrapper"
        containerWidth={120}
      />
      <div className="dial-code">({dialCode})</div>
      <BasicInput
        {...inputProps}
        onChange={(value) => onChange?.(`${dialCode} ${value}`)}
        register={register ? typeof register === 'function' ? register((value) => `${dialCode} ${value}`) : register : undefined}
        inputId={id}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
