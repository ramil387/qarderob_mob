import axios from 'axios';
import { SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorHandlers } from './errorHandlers';
import { baseUrl } from '@/constants';

export const api = axios.create({ baseURL: SERVER_URL });

api.interceptors.request.use(
    function (config: any) {
        console.log({ requestedUrl: baseUrl + config.url })
        return config;
    },
    function (error: any) {
        return false;
    },
);

api.interceptors.response.use(
    function (response: any) {
        console.log(`_RESPONSE_${response?.status}`, response.config.url)
        // success200(response)
        return response;
    },
    errorHandlers, // handling (response error) from service
);

const http = {
    get: (url: string) => api.get(url),
    post: (url: string, body?: any) => api.post(url, body),
    patch: (url: string, body?: any) => api.patch(url, body),
    upload: async (url: string, body: any) =>
        axios.post(url, body, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            },
        }),
    delete: (url: string) => api.delete(url)
};

export { http };
