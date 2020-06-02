import {useState, useEffect} from 'react';
import unsplash, {API_DEFAULT_PARAMS} from '../api/unsplash';

export default () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);

  const searchAPI = async term => {
    setLoader(true);
    setError(false);
    try {
      const response = await unsplash.get('/photos', {
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

  useEffect(() => {
    searchAPI('');
  }, []);

  return [searchAPI, error, setError, loader, results];
}