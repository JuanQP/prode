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
  avatar: string;
}

interface RefreshTokenResponse {
  access: string;
}

export const refreshApi = createRefresh({
  interval: 4,
  refreshApiCallback: async (param) => {
    try {
      if(!param.refreshToken) throw new Error("No refresh token given")
      const response = await refreshToken(param.refreshToken)
      return { isSuccess: true, newAuthToken: response.access }
    } catch (error) {
      return { isSuccess: false, newAuthToken: '' }
    }
  },
})

async function refreshToken(refreshToken: string) {
  const response = await axios.post<RefreshTokenResponse>('/api/token/refresh/', {
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
