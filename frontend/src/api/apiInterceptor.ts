import apiClient from "./apiClient";
// import { AUTH_ENDPOINTS } from "./endpoints/authEndpoints";

// Attach JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login"; // Force logout
    }
    return Promise.reject(error);
  }
);

// Handle expired tokens & refresh token logic
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         // Try to refresh token
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("No refresh token found");

//         const { data } = await apiClient.post(AUTH_ENDPOINTS.REFRESH, {
//           refreshToken,
//         });
//         localStorage.setItem("token", data.token);

//         // Retry failed request
//         error.config.headers.Authorization = `Bearer ${data.token}`;
//         return apiClient(error.config);
//       } catch (refreshError) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
