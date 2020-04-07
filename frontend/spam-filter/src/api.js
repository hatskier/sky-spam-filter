import axios from 'axios';
import config from './config';

const api = {
  async resetItems() {
    await axios.post(`${config.api}/resetItems`);
  },

  async getItems() {
    const response = await axios(`${config.api}/items`);
    return response.data;
  },

  async setItemState(id, state) {
    await axios.put(`${config.api}/items/${id}`, { state });
  },
};

export default api;
