import create from 'zustand';
import { persist } from 'zustand/middleware';

interface authType {
  token: string;
  isAuthenticated: Boolean;
  isAuthenticating: Boolean;
  user?: {
    name: string;
    group: string;
  };
  setAccessToken: (token: string) => void;
}

const authStore = create(
  persist<authType>(
    (set, get) => ({
      token: '',
      isAuthenticated: false,
      isAuthenticating: false,
      user: undefined,
      setAccessToken: (token) =>
        set((state) => ({
          ...state,
          token,
        })),

      getToken: () => set({ token: get().token }),
    }),
    {
      name: 'access',
    }
  )
);

export default authStore;

export function removeAccessToken() {
  authStore.persist.clearStorage();
}
