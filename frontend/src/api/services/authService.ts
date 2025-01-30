import apiClient from "../apiInterceptor";
import { AUTH_ENDPOINTS } from "../endpoints/authEndpoints";

const login = async (email: string, password: string) => {
  try {
    const { data } = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export { login, logout };
