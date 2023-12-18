import { getTimezone } from 'countries-and-timezones';
import CountryList from 'country-list-with-dial-code-and-flag'
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg';
import React, { ReactNode, useId, useMemo, useState } from 'react';
import { classNames } from '../../../helpers';
import { Select } from '../Select';
import { BasicInput } from './Input';
import { InputCellPhoneNumberProps } from './types';

export const InputCellPhoneNumber = <T, >(props: InputCellPhoneNumberProps<T>) => {
  
  const {
    extend = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    register,
    ...inputProps
  } = props;
  const id = useId();
  const [ countryCode, setCountryCode ] = useState<string>(getTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)?.countries[0] as string);
  const options = useMemo(() => {
    const list = CountryList.getAll();
    return list.map((country) => ({
      value: country.code,
      label: (
        <div className="jk-col">
          <div className="jk-row extend left fw-bd">{country.name}</div>
          <div className="jk-row gap nowrap">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(CountryFlagSvg[country.code])}`}
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
          label: <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(CountryFlagSvg[countryCode])}`}
            alt={countryCode}
            height={24}
            width={36}
          />,
        }}
        onChange={({ value }) => setCountryCode(value)}
        popoverClassName="popover-select-cell-phone-number-wrapper"
        containerWidth={120}
      />
      <div className="dial-code">({CountryList.findByCountryCode(countryCode)[0]?.dial_code})</div>
      <BasicInput {...inputProps} inputId={id} />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
    </div>
  );
};
