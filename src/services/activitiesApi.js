import api from './api';

export async function getActivitiesByDate(token, eventId, date) {
  const response = await api.get(`/activitie/${eventId}/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
