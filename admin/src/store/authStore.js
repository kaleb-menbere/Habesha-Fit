import { create } from 'zustand';

const useAuthStore = create((set) => ({
  admin: null,
  token: null,
  isAuthenticated: false,

  login: (adminData, token) => {
    localStorage.setItem('adminToken', token);
    set({
      admin: adminData,
      token,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    set({
      admin: null,
      token: null,
      isAuthenticated: false
    });
  },

  loadAdmin: () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // You could validate token here
      set({ token, isAuthenticated: true });
    }
  }
}));

export default useAuthStore;