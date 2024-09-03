// Import thư viện axios để thực hiện các yêu cầu HTTP
import axios from 'axios';

// Địa chỉ gốc của API
const API_BASE_URL = 'http://127.0.0.1:8000/api/SiQuan';

// Hàm cấu hình axios với các thiết lập mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Các header khác nếu cần
  }
});

// GET cấp đơn vị theo id nhóm đơn vị
export const fetchSiQuan = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetchCapDonVi:', error);
    throw error;
  }
};


// // GET BY ID
// export const fetchKhachById = async (makhach) => {
//   try {
//     const response = await apiClient.get(`/LayTheKhach/${makhach}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching Khach with ID ${makhach}:`, error);
//     throw error;
//   }
// };

// Create
export const createSiQuan = async (userData) => {
  try {
    console.log(userData)
    const response = await apiClient.post('/them/', userData);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error createCapDonVi:', error);
    throw error;
  }
};

// UPDATE
export const updateSiQuan = async (id, userData) => {
  try {
    const response = await apiClient.put(`/sua/${id}`, userData);

    return response.data;
  } catch (error) {
    console.error(`Error updateCapDonVi with ID ${id}:`, error);
    throw error;
  }
};

// DELETE
export const deleteSiQuan = async (id) => {
  try {
    const response = await apiClient.delete(`/xoa/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleteCapDonVi with ID ${id}:`, error);
    throw error;
  }
};
