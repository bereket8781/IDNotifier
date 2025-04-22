import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
};

const logout = () => {
  localStorage.removeItem('token');
};

export default {
  login,
  logout,
};