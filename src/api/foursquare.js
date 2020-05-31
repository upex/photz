import axios from 'axios';

export const API_DEFAULT_PARAMS = {
  client_id: '',
  client_secret: '',
  v: 20180323,
  ll: '40.7243, -74.0018'
};

export default axios.create({
  baseURL: 'https://api.foursquare.com/v2/venues'
});
