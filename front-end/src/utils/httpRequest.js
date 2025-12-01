import axios from "axios";

const httpRequest = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "/api/",
});

// REQUEST: thêm token nếu có
httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE: handle 401
httpRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// GET
export const get = async (path) => {
  try {
    const response = await httpRequest.get(path);
    return response.data;
  } catch (error) {
    return new Error(`GET Error: ${error}`);
  }
};

// POST
export const post = async (path, payload, headers = {}) => {
  try {
    const response = await httpRequest.post(path, payload, { headers });
    return response.data;
  } catch (error) {
    return new Error(`POST Error: ${error}`);
  }
};

// PUT
export const put = async (path, payload) => {
  try {
    const response = await httpRequest.put(path, payload);
    return response.data;
  } catch (error) {
    return new Error(`PUT Error: ${error}`);
  }
};

// DELETE
export const del = async (path) => {
  try {
    const response = await httpRequest.delete(path);
    return response.data;
  } catch (error) {
    return new Error(`DELETE Error: ${error}`);
  }
};

// PATCH
export const patch = async (path, payload) => {
  try {
    const response = await httpRequest.patch(path, payload);
    return response.data;
  } catch (error) {
    return new Error(`PATCH Error: ${error}`);
  }
};

export default httpRequest;