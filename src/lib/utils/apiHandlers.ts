import { AxiosResponse } from 'axios';
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


type TCreateInvoice = {
  "amount_sats": number,
  "comment": string,
  "tweet_url": string,
  "tip_sender": string
}
export const createInvoice = async (request_body:TCreateInvoice):Promise<AxiosResponse<any, any>> =>{
  try {
    const response = await axiosClient.post(`${API_BASE_URL}/tips`, request_body);
    return response.data;
  } catch (error) {
    throw error;
    
  }
}