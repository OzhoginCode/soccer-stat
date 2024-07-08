import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.PROD ? 'https://api.football-data.org/v2' : '/api';

const client = axios.create({
  baseURL,
  headers: {
    'X-Auth-Token': apiKey,
  },
});

export default client;
