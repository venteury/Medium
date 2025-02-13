import apiClient from "../apiInterceptor";
import { AUTH_ENDPOINTS } from "../endpoints/authEndpoints";
import { SignupType, SigninType } from "@venteury/blog-common";

const login = async (data: SignupType) => {
  try {
    const res = await apiClient.post(AUTH_ENDPOINTS.LOGIN, data);

    localStorage.setItem("token", res.data.jwt);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const signup = async (data: SigninType) => {
  try {
    const res = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const logout = () => {
  console.log("Logging out");
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export { login, signup, logout };
