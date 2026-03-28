/**
 * Rivals.gg — API helper compartido
 * Todas las llamadas al backend pasan por aquí.
 */

const API_BASE = 'http://localhost:3000/api';

/**
 * Fetch con token JWT automático y manejo de errores unificado.
 * @param {string} endpoint  - Ruta relativa, ej: '/auth/login'
 * @param {RequestInit} options
 * @returns {Promise<any>}   - JSON de respuesta
 * @throws {Error}           - con el mensaje del servidor
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('rivals_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Error desconocido');
  }

  return data;
}

// ── Atajos por módulo ──────────────────────────────────────

export const AuthAPI = {
  login:    (body) => apiFetch('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me:       ()     => apiFetch('/auth/me'),
};

export const TicketAPI = {
  history:  (page = 1)    => apiFetch(`/tickets?page=${page}`),
  packages: ()             => apiFetch('/tickets/recharge'),
};

export const PayPalAPI = {
  createOrder: (packageId) => apiFetch('/paypal/create-order', {
    method: 'POST',
    body: JSON.stringify({ packageId }),
  }),
};

export const UserAPI = {
  getProfile:    (id)  => apiFetch(`/users/${id}`),
  updateProfile: (id, body) => apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  listProviders: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/users${qs ? '?' + qs : ''}`);
  },
};

export const ReservationAPI = {
  list:   (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/reservations${qs ? '?' + qs : ''}`);
  },
  create: (body)        => apiFetch('/reservations', { method: 'POST', body: JSON.stringify(body) }),
  get:    (id)          => apiFetch(`/reservations/${id}`),
  action: (id, body)    => apiFetch(`/reservations/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  review: (id, body)    => apiFetch(`/reservations/${id}/review`, { method: 'POST', body: JSON.stringify(body) }),
};

export const MessageAPI = {
  conversations: ()              => apiFetch('/messages/conversations'),
  history:       (withId, page)  => apiFetch(`/messages?with=${withId}&page=${page || 1}`),
  send:          (body)          => apiFetch('/messages', { method: 'POST', body: JSON.stringify(body) }),
};

export const ReportAPI = {
  create: (body) => apiFetch('/reports', { method: 'POST', body: JSON.stringify(body) }),
};

export const WithdrawalAPI = {
  history: ()     => apiFetch('/withdrawals'),
  request: (body) => apiFetch('/withdrawals', { method: 'POST', body: JSON.stringify(body) }),
};
