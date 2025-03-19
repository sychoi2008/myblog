import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "", // 백엔드 주소 통합 관리
});

export default api;
