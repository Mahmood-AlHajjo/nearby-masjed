import axios from 'axios';
import apiConfig from './constants';

const apiClient = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    Accept: 'application/json',
  },
});

export default apiClient;
