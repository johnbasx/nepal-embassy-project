import { NOCType } from '@utils/interface';
import moment from 'moment';

// NOC Document registration and date details
export const DocDetails = ({ ...data }: NOCType) => (
  <div
    className="flex justify-between font-serif text-sm font-bold"
    style={textBodyStyles}
  >
    <div className="inline-flex space-x-1">
      <p className="">Ref. No.</p>
      <span className="text-sm">{data.reference_number}</span>
    </div>

    <div className="inline-flex space-x-1">
      <p className="font-bold">Date:-</p>
      <span>{moment(data.verified_on).format('L')}</span>
    </div>
  </div>
);

// 1st part of the NOC Document
export const ContentBodyNOC_1 = ({
  full_name = '#ERROR!',
  passport_no = 101010,
  travel_country = '#ERROR!',
  travel_via,
  travel_from = '#EEROR!',
}: {
  full_name: string;
  passport_no: number;
  travel_country: string;
  travel_via?: string;
  travel_from: string;
}) => (
  <div className="font-serif text-justify indent-12" style={textBodyStyles}>
    <p>
      Based on the documents submitted at this Embassy, this is to state that{' '}
      <span className="font-extrabold">Mr. {full_name}</span> (holder of Nepali{' '}
      <span className="font-bold">Passport No. {passport_no}</span>
      ), currently staying in India, is intending to travel to the{' '}
      {travel_country} using {travel_from} in India shortly.
    </p>
  </div>
);

// 2nd Part of the NOC
export const ContentBodyNOC_2 = ({
  travel_country = '#ERROR!',
}: {
  travel_country: string;
}) => {
  return (
    <div className="font-serif text-justify indent-12" style={textBodyStyles}>
      <p>
        Any needful cooperation extended to him during his journey from India to
        the {travel_country} as per the existing rules and regulation, would be
        highly appreciated.
      </p>
    </div>
  );
};

// NOC Document Page size
export const pageStyle = {
  backgroundColor: '#ffffff',
  width: '210mm',
  minHeight: '297mm',
};

// For Text body styles in the pdf
export const textBodyStyles = {
  WebkitTransform: 'scaleX(1.08)',
  transform: 'scaleX(1.08)',
  paddingRight: '7.4rem',
  paddingLeft: '7.4rem',
};

// Empty Spaces
export const EmptySpace = ({ space }: { space: number }) => (
  <div style={{ height: `${space}rem` }}></div>
);
