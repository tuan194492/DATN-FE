// Import thư viện axios để thực hiện các yêu cầu HTTP
import axios from 'axios';

// Địa chỉ gốc của API
const API_BASE_URL = 'http://127.0.0.1:8000/api/NhomDonVi';

// Hàm cấu hình axios với các thiết lập mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Các header khác nếu cần
  }
});

// GET tất cả thông tin các nhóm đơn vị
export const fetchNhomDonVi = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data.data;
  } catch (error) {
    console.error('Error fetchNhomDonVi:', error);
    throw error;
  }
};

// GET BY ID
export const fetchNhomDonViById = async (id) => {
  try {
    const response = await apiClient.get(`/thongtin/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching Khach with ID ${id}:`, error);
    throw error;
  }
};

// Create
export const createNhomDonVi = async (userData) => {
  try {
    const response = await apiClient.post('/them/', userData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error createNhomDonVi:', error);
    throw error;
  }
};

// UPDATE
export const updateNhomDonVi = async (id, userData) => {
  try {
    const response = await apiClient.put(`/sua/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updateNhomDonVi with ID ${id}:`, error);
    throw error;
  }
};

// DELETE
export const deleteNhomDonVi = async (id) => {
  try {
    const response = await apiClient.delete(`/xoa/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Khach with ID ${id}:`, error);
    throw error;
  }
};