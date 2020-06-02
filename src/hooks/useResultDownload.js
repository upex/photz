import {useState} from 'react';
import unsplash, {API_DEFAULT_PARAMS} from '../api/unsplash';

export default () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState({});

  const downloadPhoto = async (id, cb) => {
    setLoader(true);
    setError(false);
    try {
      const response = await unsplash.get(`/photos/${id}/download`, {
        params: {
          ...API_DEFAULT_PARAMS
        }
      });

      setResult(response.data);
      setLoader(false);
      cb(response.data)
    } catch (error) {
      console.log('error==>', error)
      setError(true);
      setResult([]);
      setLoader(false);
    }
  }

  return {downloadPhoto, error, setError, loader, result};
}