import Link from 'next/link';
import { NocDetailTypes } from '@utils/interface';
import { classNames } from '@utils/helpers';
import useSelectAll from 'hooks/useSelectAll';

export const tableHeaders = [
  'id',
  'Name',
  'Email',
  'Travel Country',
  'Travel Type',
  'Age',
  'Return Date',
  'Passport No.',
  'Applied on',
  // 'Status',
];

export const TableAllSelector = () => {
  const { selectAll } = useSelectAll();
  return (
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
            }}
          />
        </label>
      </div>
    </th>
  );
};

export const TableIndividualSelector = ({ list }: { list: NocDetailTypes }) => {
  const { onChangeHandler } = useSelectAll();
  return (
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
  );
};
export const TableCellHead = ({
  label,
  menu = false,
}: {
  label: string;
  menu?: boolean;
}) => {
  return (
    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
      <div className="font-semibold text-left">{label}</div>
    </th>
  );
};

export const TableCellWrapper = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap body-column">
      {children}
    </td>
  );
};

export const TableCellBody = ({
  data,
  link,
  unique = false,
  linkRedirect = true,
  className = '',
  children,
}: {
  data: string;
  link: string;
  unique?: boolean;
  linkRedirect?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <TableCellWrapper>
      <Link href={linkRedirect ? link : '#!'}>
        <div className="flex items-center">
          <div
            className={classNames(
              'font-medium',
              className,
              unique ? 'text-blue-700' : ' text-gray-800'
            )}
          >
            {data}
          </div>
        </div>
      </Link>
    </TableCellWrapper>
  );
};
