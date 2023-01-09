import React, {useState, useEffect} from 'react'
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import { FetchData } from '@utils/fetcher';
import authStore from '@store/adminAuthStore';
const { token } = authStore();
import { BASE_URL } from '@content/api-urls';

const NocIssuedList = () => {
    const [issuedNocs, setIssuedNocs] = useState<NocDetailTypes[]>([])
  const [total, setTotal] = useState<number>(0);


    const getRecentlyIssuedNocs = async () => {
        const data = await FetchData(token, BASE_URL + 'nocIssuedList');
        setIssuedNocs(data.results);
        setTotal()
    }
    useEffect(() => {
       getRecentlyIssuedNocs();
    }, [])
    
  return (
    <div className="bg-white border-gray-200 rounded-lg shadow-lg">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">
          Total <span className="font-medium text-gray-400">{total}</span>
        </h2>
      </header>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-200 bg-gray-50">
              <tr className="divide-x">
                <th className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        id="parent-checkbox"
                        className="form-checkbox"
                        type="checkbox"
                        onChange={(e) => {
                          selectAll(e.target.checked);
                          console.log(selectedUsers);
                        }}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Travel Country</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Age</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold">Return Date</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Passport no.</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">status</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200">
              {nocRegisteredCitizen?.map((list, index) => (
                <tr
                  key={list.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    reviewNoc(list.id, index);
                  }}
                >
                  <td
                    className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap"
                    data-column="table-column"
                  >
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="sr-only">Select</span>
                        <input
                          className="table-item form-checkbox"
                          type="checkbox"
                          id={list.id}
                          onChange={(e) => {
                            onChangeHandler(list.id, e.target.checked);
                          }}
                        />
                      </label>
                    </div>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="flex items-center">
                        <div className="font-medium text-blue-700">
                          {list.full_name}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="text-left">{list.email}</div>
                    </Link>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="text-left">{list.travel_country}</div>
                    </Link>
                  </td>

                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="text-left">
                        {Math.floor(moment().diff(list.dob, 'years', true))}{' '}
                        years
                      </div>
                    </Link>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="text-center">{list.return_date}</div>
                    </Link>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="text-left">{list.passport_number}</div>
                    </Link>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div>{checkVerifiedStatus(list.verified_status)}</div>
                    </Link>
                  </td>
                  <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <button className="text-gray-400 rounded-full hover:text-gray-500">
                      <span className="sr-only">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="10" cy="16" r="2" />
                        <circle cx="22" cy="16" r="2" />
                      </svg>
                    </button>
                    {/* <DropdownMenu {...list} /> */}
                  </td>
                </tr>
              ))}
              <tr className="h-28">
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* Paginations */}
          <div className="flex items-center justify-center py-6">
            <div>
              <nav
                className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    setSelectedUsers([]);
                    loadNextPage(prevPage);
                  }}
                  className={classNames(
                    prevPage
                      ? 'text-blue-700 hover:bg-gray-50 focus:z-20'
                      : 'cursor-not-allowed',
                    'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md '
                  )}
                >
                  <span className="sr-only">Previous</span>

                  <ChevronLeftIcon className="w-5 h-5" />
                  <span>Prev</span>
                </button>

                {/* <PageNumber index={secondToLast(nextPage)} /> */}

                <button
                  onClick={() => {
                    setSelectedUsers([]);
                    loadNextPage(nextPage);
                  }}
                  className={classNames(
                    nextPage
                      ? 'text-blue-700 hover:bg-gray-50 focus:z-20'
                      : 'cursor-not-allowed',
                    'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md '
                  )}
                >
                  <span className="sr-only">Next</span>

                  <span>Next</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NocIssuedList