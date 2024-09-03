import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/Khach';

// Cấu hình Axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Thêm header này để chỉ định rằng bạn muốn nhận dữ liệu JSON
    }
  });

// Hàm lấy danh sách loại khách
export const fetchLoaiKhach = async () => {
    try {
      const response = await apiClient.get('/LayLoaiKhach/');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching loai khach:', error);
      throw error;
    }
  };


// Hàm lấy chi tiết một loại khách cụ thể
export const fetchLoaiKhachById = async (makhach) => {
  try {
    const response = await apiClient.get(`/LayLoaiKhach/${makhach}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching loai khach with ID ${makhach}:`, error);
    throw error;
  }
};

// Hàm tạo một loại khách mới
export const createLoaiKhach = async (userData) => {
  try {
    const response = await apiClient.post('/ThemLoaiKhach/', userData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating loai khach:', error);
    throw error;
  }
};

// Hàm cập nhật thông tin loại khách
export const updateLoaiKhach = async (makhach, userData) => {
  try {
    const response = await apiClient.put(`/SuaLoaiKhach/${makhach}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating loai khach with ID ${makhach}:`, error);
    throw error;
  }
};

// Hàm xóa một loại khách
export const deleteLoaiKhach = async (id) => {
  try {
    const response = await apiClient.delete(`/HuyLoaiKhach/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting loai khach with ID ${id}:`, error);
    throw error;
  }
};
