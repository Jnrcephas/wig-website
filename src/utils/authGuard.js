import { store } from '../main.js';

export function requireAuth(redirectUrl = 'login.html') {
  const state = store.getState();
  
  if (!state.user.isAuthenticated) {
    const currentUrl = window.location.pathname + window.location.search;
    window.location.href = `${redirectUrl}?return=${encodeURIComponent(currentUrl)}`;
    return false;
  }
  
  return true;
}

export function redirectIfAuthenticated(redirectUrl = 'account.html') {
  const state = store.getState();
  
  if (state.user.isAuthenticated) {
    window.location.href = redirectUrl;
    return true;
  }
  
  return false;
}

export function getCurrentUser() {
  const state = store.getState();
  return state.user.currentUser;
}

export function isAuthenticated() {
  const state = store.getState();
  return state.user.isAuthenticated;
}