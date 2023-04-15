import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { UserType } from '../Types';

const backendApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND
})

export async function signUpApi(user: UserType) {
    const res: AxiosResponse<any, any> = await backendApi.post('/auth/signup', user);
    return res;
  }
