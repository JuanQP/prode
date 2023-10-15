import { RegisterData } from "@/features/UI/RegisterForm";
import { LoginData } from "@features/UI/LoginForm";
import axios from "axios";
import { createRefresh } from "react-auth-kit";
import { BACKEND_URL } from "./constants";

interface LoginResponse {
  refresh: string;
  access: string;
}

interface RegisterResponse {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

interface MessageResponse {
  access: string;
}

interface UserResponse extends RegisterResponse {
  id: number;
  is_staff: boolean;
}

export interface UserData extends Pick<UserResponse, "first_name"> {
  avatar: File | null;
}

interface UpdateUserResponse extends Omit<UserData, "avatar"> {
  avatar: string | null;
}

export interface ChangePasswordData {
  password: string;
  password2: string;
}

export const refreshApi = createRefresh({
  interval: 4,
  refreshApiCallback: async (param) => {
    try {
      if(!param.refreshToken) throw new Error("No refresh token given")
      const response = await refreshToken(param.refreshToken)
      return {
        isSuccess: true,
        newAuthToken: response.access,
        newAuthTokenExpireIn: 5,
      }
    } catch (error) {
      return { isSuccess: false, newAuthToken: '' }
    }
  },
})

async function refreshToken(refreshToken: string) {
  const response = await axios.post<MessageResponse>(`${BACKEND_URL}/api/token/refresh/`, {
    refresh: refreshToken,
  })
  return response.data
}

export async function login(credentials: LoginData) {
  const response = await axios.post<LoginResponse>(`${BACKEND_URL}/api/token/`, credentials)
  return response.data
}

export async function register(values: RegisterData) {
  const response = await axios.post<RegisterResponse>(`${BACKEND_URL}/api/register/`, values)
  return response.data
}

export async function getCurrentUser() {
  const response = await axios.get<UserResponse>(`${BACKEND_URL}/api/users/me/`)
  return response.data
}

export async function updateUserInfo(values: Partial<UserData>) {
  const formData = new FormData()
  if(values.first_name) formData.append('first_name', values.first_name)
  if(values.avatar) formData.append('avatar', values.avatar)
  // Laravel won't work if this is missing
  // https://laracasts.com/discuss/channels/javascript/axiosajax-http-patch-requests-with-file-not-working
  formData.append('_method', 'PUT');

  const response = await axios.post<UpdateUserResponse>(`${BACKEND_URL}/api/users/me/`, formData)
  return response.data
}

export async function changePassword(id: string, values: ChangePasswordData) {
  const response = await axios.post<MessageResponse>(`${BACKEND_URL}/api/users/${id}/change_password/`, values)
  return response.data
}
