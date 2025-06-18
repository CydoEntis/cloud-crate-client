import api from "@/lib/api";

export const login = async (credentials: { email: string; password: string }) => {
  const res = await api.post("/auth/login", credentials);
  console.log(res.data);
  return res.data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};
