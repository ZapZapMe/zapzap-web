import axiosClient, { API_BASE_URL } from './axiosClient';

// Example API handler
export const updateWalletAddress = async (newAddress:string) => {
  try {
    const response = await axiosClient.put(`${API_BASE_URL}/users/me`, { wallet_address: newAddress });
    return response.data;
  } catch (error) {
    throw error;
  }
};