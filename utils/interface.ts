export interface nocdataType {
  travelFrom: string;
  travelCountry: string;
  travelDate: string;
  district: string;
  province: string;
  returnDate: string;
  passportNumber: string;
  travelPurpose: string;
  visa?: File;
  passport?: File;
  airTicket?: File;
  hotelBooking?: File;
  nagarita?: File;
  writeUp?: File;
  rentalAgreement?: File;
  offerLetter?: File;
  landlordWriteup?: File;
  departure?: File;
  arrivalDocument?: File;
  familyRelationDocument?: File;
  RelativePassport?: File;
  relativeNagarita?: File;
  sponsorshipLetter?: File;
  setIsLoading?: (token: string) => void;
}

export interface nocDocumentType {
  id: string;
  created_at: string;
  travel_date: string;
  return_date: string;
  full_name: string;
  dob: string;
  email: string;
  travel_purpose_value: string;
  district: string;
  province: string;
  passport_number: number;
  travel_from: string;
  travel_via: string;
  travel_type: string;
  travel_country: string;
  travel_purpose: string;
  travelling_name?: any;
  verified_status: string;
  verified_at?: any;
  check_living_in_india: boolean;
  payment_screen_shot: string;
  payment_verified: string;
  noc_profile: string;
  verified_by?: any;
}

export interface DetailType {
  id: string;
  full_name: string;
  email: string;
  age: string;
  passport_number: number;
  travel_from?: string;
  travel_country: string;
  travel_purpose_value: string;
  travel_date?: string;
  return_date?: string;
  district?: string;
  province?: string;
  hotel_booking_doc: string;
  flight_ticket: string;
  visa: string;
  passport: string;
  documents_verified: boolean;
}

export interface NocDetailTypes {
  id: string;
  full_name: string;
  email: string;
  dob: string;
  age: string;
  district: string;
  province: string;
  passport_number: number;
  travel_type: 'Direct' | 'Connecting';
  travel_from: string;
  travel_country: string;
  travel_purpose_value: string;
  verified_status?: string;
  travel_date: string;
  return_date: string;
  created_at: string;
}

export interface NocFilesType {
  id: string;
  doc_name: string;
  document_file: string;
  created_at: string;
  updated_at?: string;
  verification_status: string;
  verified_at: string;
  original_document: boolean;
  noc_document: string;
  verified_by: number;
}

export interface CityType {
  city: string;
  post_code: string;
}

export interface DistrictCityType {
  district: string;
  city: CityType[];
}
