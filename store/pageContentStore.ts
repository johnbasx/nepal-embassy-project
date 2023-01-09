import { devtools, persist } from 'zustand/middleware';

import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import create from 'zustand';

interface ContentType {
  nocList: NocDetailTypes[];
  setNocList: (list: NocDetailTypes[]) => void;

  filteredList: NocDetailTypes[];
  setFilteredLIst: (list: NocDetailTypes[]) => void;
}
const pageContentStore = create<ContentType>((set) => ({
  nocList: [],
  setNocList: (list) =>
    set((state) => ({
      ...state,
      nocList: list,
    })),

  filteredList: [],
  setFilteredLIst: (list) =>
    set((state) => ({
      ...state,
      filteredList: list,
    })),
}));

export default pageContentStore;
