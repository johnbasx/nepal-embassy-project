import { devtools, persist } from 'zustand/middleware';

// import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import create from 'zustand';

export type UserProps = {
  fullName?: string;
  email?: string;
};

interface UserStoreType {
  userData: UserProps;
  setUserData: (user: UserProps) => void;
}
const userTempStore = create(
  persist<UserStoreType>(
    (set, get) => ({
      userData: { fullName: '', email: '' },
      setUserData: (user) =>
        set((state) => ({
          ...state,
          userData: user,
        })),
      getUserData: () => set({ userData: get().userData }),
    }),

    {
      name: 'temp_user',
    }
  )
);

export default userTempStore;

export function removeUsertempData() {
  userTempStore.persist.clearStorage();
}
