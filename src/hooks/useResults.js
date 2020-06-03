import {useState} from 'react';
import unsplash, {API_DEFAULT_PARAMS} from '../api/unsplash';

export default () => {
  const [pageNo, setPageNo] = useState(API_DEFAULT_PARAMS.page);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);

  const searchAPI = async (term, page = 1) => {
    if (!term) {
      setIsRefreshing(false);
      setResults([]);
      return;
    }
    const resultData = page === 1 ? [] : results;
    setLoader(true);
    setError(false);
    try {
      const response = await unsplash.get('/search/photos', {
        params: {
          ...API_DEFAULT_PARAMS,
          query: term,
          page: page
        }
      });
      setPageNo(page +1);
      const paginatedData = [...resultData, ...(response.data.results || [])];
      setResults(paginatedData);
      setLoader(false);
      setIsRefreshing(false);
    } catch (error) {
      setError(true);
      setResults([]);
      setLoader(false);
      setIsRefreshing(false);
    }
  }

  return {isRefreshing, setIsRefreshing, searchAPI, error, setError, loader, pageNo, results};
}