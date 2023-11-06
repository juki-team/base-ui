export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export interface JukiUserProviderProps {
  serviceApiUrl: string,
  socketServiceUrl: string,
  utilsUiUrl: string,
  tokenName: string,
}
