import axios, { AxiosInstance, AxiosResponse } from "axios";
import { UserLogin, UserType } from "../Types";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const backendApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
});
const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function signUpApi(user: UserType) {
  try {
    const res: AxiosResponse<any, any> = await backendApi.post(
      "/auth/signup",
      user
    );
    alert("Your account is created successfully");
  } catch (error: any) {
    if (error.response.status == 401) alert("User already exist");
    switch (error.response.status) {
      case 400:
        alert("Check your credential");
      case 401:
        alert("User already present with this detail");
      case 500:
        alert("Server Error");
      default:
        alert("There is some problem");
    }
  }
}
export async function signInApi(user: UserLogin) {
  try {
    const response: AxiosResponse<any, any> = await backendApi.post(
      "/auth/signIn",
      user
    );
    Cookies.set("token", response.data.token, { expires: 10 });
    alert("Sign In successfully");
    return response.data;
  } catch (error: any) {
    switch (error.response.status) {
      case 400:
        alert("Check your credential");
      case 401:
        alert("Check your password");
      case 404:
        alert("User not found");
      case 500:
        alert("Server Error");
      default:
        alert("There is some problem");
    }
  }
}

export async function getUser() {
  try {
    const response: AxiosResponse<any, any> = await authApi.get("/user");
    return response.data;
  } catch (error: any) {
    switch (error.response.status) {
      case 401:
        alert("You are not authorize");
    }
    console.log(error);
  }
}
