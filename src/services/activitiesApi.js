import api from './api';

export async function getActivitiesByDate(token, eventId, date) {
  const response = await api.get(`/activitie/${eventId}/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getSubscriptionsByUserId(token) {
  const response = await api.get('/activitie/subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postSubscription(body, token) {
  const response = await api.post('/activitie/subscriptions', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
