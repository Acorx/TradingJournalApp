import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTrades = async () => {
  try {
    const response = await axios.get(`${API_URL}/trades`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des trades:', error);
    throw error;
  }
};

export const addTrade = async (trade: {
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: string;
  notes: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/trades`, trade);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du trade:', error);
    throw error;
  }
};

export const uploadCSV = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/trades/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    throw error;
  }
};