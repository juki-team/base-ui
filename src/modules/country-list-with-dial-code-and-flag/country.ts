import { countryList } from '.';
import { CountryInterface } from './types';

class Country {
  private data: CountryInterface
  
  constructor(data: CountryInterface) {
    this.data = data
  }
  
  public get name(): string {
    return this.data.name
  }
  
  public get dialCode(): string {
    return this.data.dial_code
  }
  
  public get dial_code(): string {
    return this.data.dial_code
  }
  
  public get code(): string {
    return this.data.code
  }
  
  public get flag(): string {
    return this.data.flag
  }
  
  public get preferred(): boolean {
    return this.data.preferred ?? false
  }
  
  public get secondary(): boolean {
    return this.data.secondary ?? false
  }
  
  public get areaCodes(): Array<string> {
    return this.data.area_codes ?? []
  }
  
  public get countryCode(): string {
    return this.data.country_code ?? this.data.dial_code
  }
  
  public formatPhoneNumber(phoneNumber: string | number, format?: any) {
    if (!countryList.phoneNumberUtil) {
      console.warn(
        'PhoneNumberUtil is not being use please check our documentation for more detail',
      )
      return
    }
    const number = countryList.phoneNumberUtil.parseAndKeepRawInput(
      this.parsePhoneNumber(phoneNumber),
      this.code.toUpperCase(),
    )
    return countryList.phoneNumberUtil.format(number, format ?? 0)
  }
  
  private parsePhoneNumber(phoneNumber: string | number): string {
    phoneNumber = phoneNumber.toString()
    phoneNumber = phoneNumber.replace(/[^\d+]/g, '')
    
    if (phoneNumber.charAt(0) === '0') {
      phoneNumber = phoneNumber.slice(1)
    }
    if (phoneNumber.charAt(0) === '+') {
      return phoneNumber
    }
    
    return this.dialCode + phoneNumber
  }
}

export { Country }
