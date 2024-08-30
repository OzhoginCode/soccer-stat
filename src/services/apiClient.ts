/// <reference types="vite/client" />
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const apiKey: string = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.PROD ? 'https://api.football-data.org/v4' : '/api';

const client = axios.create({
  baseURL,
  headers: {
    'X-Auth-Token': apiKey,
  },
});

export default client;
