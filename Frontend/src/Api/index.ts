import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { UserLogin, UserType } from '../Types';
import Cookies from 'js-cookie'

const backendApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND
})

export async function signUpApi(user: UserType) {
    try {
        const res: AxiosResponse<any, any> = await backendApi.post('/auth/signup', user);
        alert("Your account is created successfully");
    } catch (error:any) {
        if(error.response.status==401)alert("User already exist")
    }
  }
  export async function signInApi(user: UserLogin) {
    try {
        const res: AxiosResponse<any, any> = await backendApi.post('/auth/signIn', user);
        Cookies.set('token', res.data.token, { expires: 10 });
        alert("Sign In successfully")
        return res.data
    } catch (error) {
        
    }
  }