export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export interface JukiUserProviderProps {
  utilsServiceUrl: string,
  utilsServiceApiVersion: string,
  utilsSocketServiceUrl: string,
  utilsUiUrl: string,
  tokenName: string,
}
