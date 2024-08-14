import axios from 'axios';

export const getMenuList = () => {
  return axios.get('/mock/106/api/menuList');
};
