import api from './api';

export async function getUserBooking(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/booking', config);
  return response.data;
}

export async function postBookRoom(roomId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.post('/booking', { roomId }, config);
  return response.data;
}

export async function changeBooking(roomId, bookingId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.put(`/booking/${bookingId}`, { roomId }, config);
  return response.data;
}
