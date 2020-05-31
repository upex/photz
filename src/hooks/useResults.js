import {useState, useEffect} from 'react';
import foursquare, {API_DEFAULT_PARAMS} from '../api/foursquare';
export default () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [results, setResults] = useState([]);

  const searchAPI = async term => {
    setLoader(true);
    setError(false);
    try {
      console.log('tryyy')
      const response = await foursquare.get('/search', {
        params: {
          ...API_DEFAULT_PARAMS,
          query: term,
          limit: 50
        }
      });
      setResults(response.data.response.venues);
      setLoader(false);
    } catch (error) {
      console.log('catch')
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