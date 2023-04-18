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
    throw error;
  }
}
export async function createChatWithEmail(email: string) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post("/chat", {
      email,
    });
    return response.data;
  } catch (error: any) {
    switch (error.response.status) {
      case 404:
        alert("User with this detail not found");
      default:
        alert("There is some problem");
    }
    throw error;
  }
}
export async function createChatWithPhone(phone: string) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post("/chat", {
      phone,
    });
    return response.data;
  } catch (error: any) {
    switch (error.response.status) {
      case 404:
        alert("User with this detail not found");
      default:
        alert("There is some problem");
    }
    throw error;
  }
}
export async function getChats() {
  try {
    const response: AxiosResponse<any, any> = await authApi.get("/chat");
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function addMessageApi(text: string, chatId: number) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post(
      "/chat/message",
      { chatId, text }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function getMessagesApi(chatId: any) {
  try {
    const response: AxiosResponse<any, any> = await authApi.get(
      "/chat/message/" + chatId?.toString()
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function createGroupApi(name: string) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post(
      "/chat/group/",
      { name }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function getGroupInfoByChatId(chatId: number) {
  try {
    const response: AxiosResponse<any, any> = await authApi.get(
      "/chat/group/"+chatId.toString()
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function addMemberByEmail(email: string, chatId: number) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post(
      "/chat/member" + chatId.toString(),
      { email }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function addMemberByPhone(phone: string, chatId: number) {
  try {
    const response: AxiosResponse<any, any> = await authApi.post(
      "/chat/member" + chatId.toString(),
      { phone }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
