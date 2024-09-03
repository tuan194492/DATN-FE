// Import thư viện axios để thực hiện các yêu cầu HTTP
import axios from 'axios';

// Địa chỉ gốc của API
const API_BASE_URL = 'http://127.0.0.1:8000/api/Khach';

// Hàm cấu hình axios với các thiết lập mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Các header khác nếu cần
  }
});

// Hàm lấy danh sách khách
export const fetchTheKhach = async () => {
  try {
    const response = await apiClient.get('/LayTheKhach');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching TheKhach:', error);
    throw error;
  }
};

// Hàm lấy chi tiết một khách cụ thể
// export const fetchTheKhachById = async (maTheKhach) => {
//   try {
//     const response = await apiClient.get(`/LayTheKhach${maTheKhach}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching TheKhach with ID ${maTheKhach}:`, error);
//     throw error;
//   }
// };

// Hàm tạo một khách mới
export const createTheKhach = async (userData) => {
  try {
    const response = await apiClient.post('/ThemTheKhach/', userData);
    console.log('res:', userData)
    return response.data;
  } catch (error) {
    console.error('Error creating TheKhach:', error);
    throw error;
  }
};

// Hàm cập nhật thông tin khách
// export const updateTheKhach = async (maTheKhach, userData) => {
//   try {
//     const response = await apiClient.put(`/TheKhach/${maTheKhach}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating TheKhach with ID ${maTheKhach}:`, error);
//     throw error;
//   }
// };

// Hàm xóa một khách
export const deleteTheKhach = async (id) => {
  try {
    const response = await apiClient.delete(`/HuyTheKhach/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting TheKhach with ID ${id}:`, error);
    throw error;
  }
};
