import React, { useEffect, useState } from 'react';

import { NocDetailTypes } from '@utils/interface';
import TableAction from '@components/admin/userList/TableAction';
import UserListTable from '@components/admin/userList/UserListTable';
import authStore from '@store/adminAuthStore';
import axios from 'axios';
import { nocDocList } from 'content/api-urls';
import pageContentStore from '@store/pageContentStore';

const NocDocList = () => {
  const { token, isAuthenticated } = authStore();
  const { nocList, setNocList } = pageContentStore();
  const [nocRegisteredCitizen, setNocRegisteredCitizen] = useState<
    NocDetailTypes[]
  >([]);
  const [nextPage, setNextPage] = useState<string>('');
  const [prevPage, setPrevPage] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  const getRegisteredNoc = async (url: string) => {
    if (url == undefined) {
      return;
    }
    try {
      const response = await axios(url, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      setTotal(response.data.count);
      setNocRegisteredCitizen(response.data.results);
      setNocList(response.data.results);
      // console.log(response.data);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRegisteredNoc(nocDocList);
  }, []);

  return (
    <div className="py-6">
      <div className="relative flex flex-col flex-1 px-4 mx-auto overflow-x-hidden overflow-y-auto sm:px-6 md:px-8">
        <div className="flex flex-col justify-between py-6 md:flex-row md:items-center gap-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Registered NOC list
          </h1>
          <TableAction
            nocRegisteredCitizen={nocRegisteredCitizen}
            setNocRegisteredCitizen={setNocRegisteredCitizen}
          />
        </div>
        <div>
          <UserListTable
            nocRegisteredCitizen={nocRegisteredCitizen}
            loadNextPage={getRegisteredNoc}
            total={total}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
    </div>
  );
};

export default NocDocList;
