import api from './api';

export async function postPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPayment(ticketId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const payment = await api.get(`/payments?ticketId=${ticketId}`, config);
  return payment;
}
