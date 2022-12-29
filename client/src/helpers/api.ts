import { RegisterData } from "@/features/UI/RegisterForm";
import { LoginData } from "@features/UI/LoginForm";
import axios from "axios";
import { createRefresh } from "react-auth-kit";

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
  const response = await axios.post<MessageResponse>('/api/token/refresh/', {
    refresh: refreshToken,
  })
  return response.data
}

export async function login(credentials: LoginData) {
  const response = await axios.post<LoginResponse>('/api/token/', credentials)
  return response.data
}

export async function register(values: RegisterData) {
  const response = await axios.post<RegisterResponse>('/api/register/', values)
  return response.data
}

export async function getCurrentUser() {
  const response = await axios.get<UserResponse>('/api/users/me/')
  return response.data
}

export async function updateUserInfo(values: Partial<UserData>) {
  const formData = new FormData()
  if(values.first_name) formData.append('first_name', values.first_name)
  if(values.avatar) formData.append('avatar', values.avatar)

  const response = await axios.put<UpdateUserResponse>('/api/users/me/', formData)
  return response.data
}

export async function changePassword(id: string, values: ChangePasswordData) {
  const response = await axios.post<MessageResponse>(`/api/users/${id}/change_password/`, values)
  return response.data
}
