import axios from 'axios';
import { UNSPLASH_CLIENT_ID } from 'react-native-dotenv'

export const API_DEFAULT_PARAMS = {
  client_id: UNSPLASH_CLIENT_ID,
  page: 1,
  per_page: 10
};

export default axios.create({
  baseURL: 'https://api.unsplash.com'
});
