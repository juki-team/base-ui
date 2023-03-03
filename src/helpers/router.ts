export const addParamQuery = (query: { [key: string]: string | string[] | undefined }, queryParamKey: string, value: string) => {
  const { [queryParamKey]: queryParam, ...restQuery } = query;
  if (Array.isArray(queryParam)) {
    const newQueryParam = queryParam.filter(v => v !== value);
    return { ...restQuery, [queryParamKey]: [...newQueryParam, value] };
  } else if (queryParam && queryParam !== value) {
    return { ...restQuery, [queryParamKey]: [queryParam, value] };
  }
  return { ...restQuery, [queryParamKey]: value };
};

export const removeParamQuery = (query: { [key: string]: string | string[] | undefined }, queryParamKey: string, value: string | null) => {
  const { [queryParamKey]: queryParam, ...restQuery } = query;
  if (value === null) {
    return restQuery;
  }
  if (Array.isArray(queryParam)) {
    const newQueryParam = queryParam.filter(v => v !== value);
    if (newQueryParam.length) {
      return { ...restQuery, [queryParamKey]: newQueryParam };
    }
  } else if (queryParam && queryParam !== value) {
    return { ...restQuery, [queryParamKey]: queryParam };
  }
  return restQuery;
};
