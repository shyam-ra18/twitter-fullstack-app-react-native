import { API_URL } from './config';

export async function login(data: {email: string}) {
  const res = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Failed to login');
  }
}

export async function authenticate(data: {email: string; emailToken: string}) {
  const res = await fetch(`${API_URL}auth/authenticate`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Failed to authenticate');
  }
  return res.json();
}
