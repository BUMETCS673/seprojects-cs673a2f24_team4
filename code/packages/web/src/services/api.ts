import axios from 'axios';
import UserService from './UserService';

export const baseURL = import.meta.env.VITE_BASE_URL;

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  try {
    const token = UserService.getToken();
    if (token && config?.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    console.log(error);
    return config;
  }
});

export const changeCaseSyncServerBaseURL = (baseURL: string) => {
  client.defaults.baseURL = `${baseURL}:3000/api/v1`;
};

export const axiosClient = client;
