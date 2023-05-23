import api from './api';

export async function getAuditorium(token) {
  const response = await api.get('/auditorium', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
