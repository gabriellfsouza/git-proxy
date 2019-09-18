import axios from 'axios';

const api = axios.create({
  baseURL: process.env.GIT_HOST || 'https://api.github.com',
});

export default api;
