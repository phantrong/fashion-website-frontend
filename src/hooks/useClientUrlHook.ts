import queryString from 'query-string';

const useClientUrlHook = () => {
  const convertObjectToQueryParam = (obj: any) => {
    return queryString.stringify(obj);
  };

  const getQueriesParams = () => {
    const query = window.location.search;
    return queryString.parse(query);
  };

  const changeUrlWithoutReload = (newUrl: string) => {
    window.history.pushState(null, '', newUrl);
  };

  return {
    convertObjectToQueryParam,
    getQueriesParams,
    changeUrlWithoutReload,
  };
};

export { useClientUrlHook };
