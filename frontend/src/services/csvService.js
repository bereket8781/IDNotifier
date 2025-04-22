import api from './api';

const uploadCsv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/import/csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default {
  uploadCsv,
};