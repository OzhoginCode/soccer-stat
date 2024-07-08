import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const client = axios.create({
  baseURL: '/api',
  headers: {
    'X-Auth-Token': apiKey,
  },
});

export default client;
