import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/'
      : process.env.REACT_APP_SERVER_URL,
});

export default api;
