import api from './api';

const getStatus = async () => {
  const response = await api.get('/sms/status');
  return response.data;
};

const sendSms = async (payload) => {
  const response = await api.post('/sms/send', payload);
  return response.data;
};

export default {
  getStatus,
  sendSms,
};