import { BiCheck, BiDownArrowAlt } from 'react-icons/bi';
import { GulfCountriesProps, gulfCountries } from './airports-gulfs';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

const GulfSelect = ({
  setSelectedGulf,
}: {
  setSelectedGulf: React.Dispatch<React.SetStateAction<any>>;
}) => {
  let defaultSelected: string = 'Select country';
  const [selected, setSelected] = useState<GulfCountriesProps>();

  function handleSelect(value: any) {
    setSelectedGulf(value);
    setSelected(value);
  }
  return (
    <div className="flex space-x-2">
      <Listbox value={selected} onChange={handleSelect}>
        <div className="relative mt-1 w-72">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            {selected ? (
              <span className="block truncate">{selected?.country}</span>
            ) : (
              <span className="block text-gray-300 truncate">
                {defaultSelected}
              </span>
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <BiDownArrowAlt
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {gulfCountries.map((country, index) => (
                <Listbox.Option
                  placeholder="Select a country"
                  key={'gulf-country-' + index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country.country}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <BiCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default GulfSelect;
