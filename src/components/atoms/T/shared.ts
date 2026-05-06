export type Dict = Record<string, string>;

export const translate = (dict: Dict, key: string): string => dict[key] ?? key;
