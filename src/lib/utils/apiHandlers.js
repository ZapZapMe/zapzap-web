import axiosClient, { API_BASE_URL } from './axiosClient';

// type TCreateInvoice = {
//   amount_sats: number;
//   comment: string;
//   tweet_url: string;
//   tip_sender: string;
// };
// POST /tips
export const createInvoice = async (request_body) => {
  try {
    return await axiosClient.post(`${API_BASE_URL}/tips/`, request_body);
  } catch (error) {
    throw error;
  }
};

// GET tips => /tips/received/:username
export const getUsersTipReceived = async (username) => {
  try {
    return await axiosClient.get(`${API_BASE_URL}/tips/received/${username}`);
  } catch (error) {
    throw error;
  }
};

// GET tips => /tips/received/:username
export const getUsersTipSent = async (username) => {
  try {
    return await axiosClient.get(`${API_BASE_URL}/tips/sent/${username}`);
  } catch (error) {
    throw error;
  }
};

// GET USER BY USERNAME => /users/:username
export const getUserByUsername = async (username) => {
  try {
    return await axiosClient.get(`${API_BASE_URL}/users/${username}`);
  } catch (error) {
    throw error;
  }
};
