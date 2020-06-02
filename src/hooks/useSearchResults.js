import {useState} from 'react';
import unsplash, {API_DEFAULT_PARAMS} from '../api/unsplash';

export default () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);

  const getResultsDetail = async id => {
    setLoader(true);
    setError(false);
    try {
      const response = await unsplash.get(`/photos/${id}`, {
        params: {
          ...API_DEFAULT_PARAMS
        }
      });
      setResults(response.data);
      setLoader(false);
    } catch (error) {
      setError(true);
      setResults([]);
      setLoader(false);
    }
  }

  return {getResultsDetail, error, setError, loader, results};
}