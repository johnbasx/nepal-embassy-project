import type { NextPage } from 'next';
import React from 'react';

const dashboard: NextPage = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        id="parent-checkbox"
                        className="form-checkbox"
                        type="checkbox"
                        // @click="toggleAll"
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Order</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Location</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Orders</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Last order</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total spent</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Refunds</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200">
              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-01.jpg"
                        width="40"
                        height="40"
                        alt="User 01"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Patricia Semklo
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">patricia.semklo@app.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇬🇧 London, UK</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">24</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #123567
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $2,890.66
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">-</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-02.jpg"
                        width="40"
                        height="40"
                        alt="User 02"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Dominik Lamakani
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">dominik.lamakani@gmail.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇩🇪 Dortmund, DE</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">77</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #779912
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $14,767.04
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">4</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-03.jpg"
                        width="40"
                        height="40"
                        alt="User 03"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Ivan Mesaros
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">imivanmes@gmail.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇫🇷 Paris, FR</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">44</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #889924
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $4,996.00
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">1</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-04.jpg"
                        width="40"
                        height="40"
                        alt="User 04"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Maria Martinez
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">martinezhome@gmail.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇮🇹 Bologna, IT</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">29</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #897726
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $3,220.66
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">2</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-05.jpg"
                        width="40"
                        height="40"
                        alt="User 05"
                      />
                    </div>
                    <div className="font-medium text-gray-800">Vicky Jung</div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">itsvicky@contact.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇬🇧 London, UK</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">22</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #123567
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $2,890.66
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">-</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-06.jpg"
                        width="40"
                        height="40"
                        alt="User 06"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Tisho Yanchev
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">tisho.y@kurlytech.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇬🇧 London, UK</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">14</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #896644
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $1,649.99
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">1</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-07.jpg"
                        width="40"
                        height="40"
                        alt="User 07"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      James Cameron
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">james.ceo@james.tech</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇫🇷 Marseille, FR</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">34</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #136988
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $3,569.87
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">2</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-08.jpg"
                        width="40"
                        height="40"
                        alt="User 08"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Haruki Masuno
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">haruki@supermail.jp</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇯🇵 Tokio, JP</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">112</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #442206
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $19,246.07
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">6</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-09.jpg"
                        width="40"
                        height="40"
                        alt="User 09"
                      />
                    </div>
                    <div className="font-medium text-gray-800">Joe Huang</div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">joehuang@hotmail.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇨🇳 Shanghai, CN</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">64</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #764321
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $12,276.92
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">-</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select</span>
                      <input
                        className="table-item form-checkbox"
                        type="checkbox"
                        // @click="uncheckParent"
                      />
                    </label>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center relative">
                    <button>
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                      <img
                        className="rounded-full"
                        src="../images/user-40-10.jpg"
                        width="40"
                        height="40"
                        alt="User 10"
                      />
                    </div>
                    <div className="font-medium text-gray-800">
                      Carolyn McNeail
                    </div>
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">carolynlove@gmail.com</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">🇮🇹 Milan, IT</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">19</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-light-blue-500">
                    #908764
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-green-500">
                    $1,289.97
                  </div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-center">2</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <button className="text-gray-400 hover:text-gray-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Replace with your content */}
        <div className="py-4">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
        {/* /End replace */}
      </div>
    </div>
  );
};

export default dashboard;
