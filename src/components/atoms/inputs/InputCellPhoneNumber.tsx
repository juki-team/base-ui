import { ProfileSetting } from '@juki-team/commons';
import { getTimezone } from 'countries-and-timezones';
import i18nIsoCountries from 'i18n-iso-countries';
import {
  CountryCallingCode,
  CountryCode,
  getCountries,
  getCountryCallingCode as libGetCountryCallingCode,
} from 'libphonenumber-js';
import React, { ReactNode, useId, useMemo, useState } from 'react';
import { classNames } from '../../../helpers';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Select } from '../Select/Select';
import { BasicInput } from './Input';
import { InputCellPhoneNumberProps } from './types';

function isoToFlagEmoji(iso: string) {
  return iso
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
}

/*
Códigos en 'list' que NO están en 'countries': (6)['AQ', 'IC', 'TF', 'HM', 'PN', 'GS']0: "AQ"1: "IC"2: "TF"3: "HM"4: "PN"5: "GS"]
Códigos en 'countries' que NO están en 'list': (2)['AC', 'TA']

✅ Códigos en list pero no en countries:
	1.	AQ (Antarctica)
	•	👉 No es un país soberano; es un continente regido por el Tratado Antártico.
	•	📞 Dial code oficial: +672 (compartido con territorio australiano externo, pero no asignado a “Antártida” como país).
	2.	IC (Islas Canarias)
	•	👉 No es país independiente; es una comunidad autónoma de España.
	•	📞 Usa el dial code de España: +34.
	•	🔹 Nota: IC no es un código ISO oficial reconocido en la lista ISO 3166-1, es un código reservado de uso regional.
	3.	TF (French Southern Territories)
	•	👉 No es país; es un territorio francés.
	•	📞 Usa +262 (compartido con Mayotte y Reunión), pero no tiene dial code independiente oficial.
	4.	HM (Heard & McDonald Islands)
	•	👉 Territorio australiano deshabitado.
	•	📞 Sin dial code operativo (sin población, sin asignación telefónica).
	5.	PN (Pitcairn Islands)
	•	👉 Territorio británico de ultramar con población mínima (~50 personas).
	•	📞 Dial code oficial: +872 (vía servicios de Inmarsat).
	6.	GS (South Georgia & South Sandwich Islands)
	•	👉 Territorio británico deshabitado.
	•	📞 Dial code oficial: +500 (compartido con Islas Malvinas).

⸻

✅ Códigos en countries pero no en list:
	1.	AC (Ascension Island)
	•	👉 Territorio británico remoto, parte del territorio de Santa Elena, Ascensión y Tristán da Cunha.
	•	📞 Dial code oficial: +247.
	2.	TA (Tristan da Cunha)
	•	👉 Parte del mismo territorio británico que Ascensión.
	•	📞 Dial code oficial: +290 (compartido con Santa Elena).

 */

i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/es.json'));

function getCountryCallingCode(countryCode: CountryCode) {
  try {
    return libGetCountryCallingCode(countryCode);
  } catch (error) {
    console.warn(error);
    return '' as CountryCallingCode;
  }
}

export const InputCellPhoneNumber = (props: InputCellPhoneNumberProps) => {
  
  const {
    expand = false,
    labelPlacement = 'top-border',
    required = false,
    label: inputLabel,
    onChange,
    register,
    ...inputProps
  } = props;
  
  const id = useId();
  const preferredLanguage = useUserStore(store => store.user.settings[ProfileSetting.LANGUAGE]);
  
  const [ countryCode, setCountryCode ] = useState<CountryCode>(getTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)?.countries[0] as CountryCode ?? '' as CountryCode);
  const options = useMemo(() => {
    const countries = getCountries().map(countryCode => ({
      countryCode,
      name: i18nIsoCountries.getName(countryCode, preferredLanguage.toLowerCase()),
      callingCode: getCountryCallingCode(countryCode),
      emoji: isoToFlagEmoji(countryCode),
    }));
    
    return countries.map(({ countryCode, callingCode, emoji, name }) => ({
      value: countryCode,
      label: (
        <div className="jk-col stretch">
          <div className="jk-row nowrap left">
            {emoji}&nbsp;(+{callingCode})
          </div>
          <div className="jk-row left fw-bd tx-t">{name}</div>
        </div>
      ),
    }));
  }, [ preferredLanguage ]);
  
  const dialCode = getCountryCallingCode(countryCode);
  
  return (
    <div
      className={classNames(`jk-wrapper-input jk-wrapper-input-cell-phone-number`, {
        expand,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      <Select<CountryCode, ReactNode, string>
        options={options}
        selectedOption={{
          value: countryCode,
          label: isoToFlagEmoji(countryCode),
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
