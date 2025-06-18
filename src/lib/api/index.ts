import { ApiService } from "./ApiClient";

const apiService = new ApiService(import.meta.env.VITE_API_URL);
export default apiService;
