import { BASE_URL } from '@content/api-urls';
import { PostData } from './fetcher';

export interface responseDataProps {
  response: {
    data: { doc_id: string };
  };
  returnValue: number;
}

export interface CheckTravelProps {
  travelFrom: string;
  travelCountry: string;
  travelVia: string;
  travelType: string;

  travelDate: string;
  district: string;
  province: string;
  returnDate: string;
  passportNumber: string;
  travelPurpose: string;
  livingInIndia: boolean;
  bankProof?: File;
  visa?: File;
  passport?: File;
  airTicket?: File;
  flightBooking?: File;
  hotelBooking?: File;
  nagarita?: File;
  writeUp?: File;
  rentalAgreement?: File;
  residenceProof?: File;
  offerLetter?: File;
  landlordWriteup?: File;
  departure?: File;
  arrivalDocument?: File;
  familyRelationDocument?: File;
  RelativePassport?: File;
  relativeNagarita?: File;
  sponsorshipLetter?: File;
  clearanceDocument?: File;
  ministryLetter?: File;
  invitationLetter?: File;
  gatsOfferLetter?: File;
  purposeApplication?: File;
  eduOfferLetter?: File;
  marksheet?: File;
  transferCertificate?: File;
  token?: string;
  setLoading?: () => void;
}
export const CheckTravelPurpose = async ({
  travelFrom,
  travelCountry,
  travelVia,
  travelType,
  travelDate,
  district,
  province,
  returnDate,
  passportNumber,
  travelPurpose,
  livingInIndia,
  bankProof,
  visa,
  passport,
  airTicket,
  hotelBooking,
  flightBooking,
  nagarita,
  writeUp,
  rentalAgreement,
  residenceProof,
  offerLetter,
  landlordWriteup,
  departure,
  arrivalDocument,
  familyRelationDocument,
  RelativePassport,
  relativeNagarita,
  sponsorshipLetter,
  clearanceDocument,
  ministryLetter,
  invitationLetter,
  gatsOfferLetter,
  purposeApplication,
  eduOfferLetter,
  marksheet,
  transferCertificate,
  setLoading,
  token,
}: CheckTravelProps) => {
  let formData = new FormData();
  formData.append('passport_number', passportNumber);
  formData.append('travel_from', travelFrom);
  formData.append('travel_country', travelCountry);
  formData.append('travel_via', travelVia);
  formData.append('travel_type', travelType);
  formData.append('travel_purpose', travelPurpose);
  formData.append('travel_date', travelDate.toString());
  formData.append('return_date', returnDate.toString());
  formData.append('district', district);
  formData.append('province', province);

  formData.append('visa', visa as Blob);
  formData.append('passport', passport as Blob);
  formData.append('air_ticket', airTicket as Blob);

  if (livingInIndia) {
    formData.append('proof_of_residence', residenceProof as Blob);
  }
  if (travelType == 'Direct') {
    formData.append('bank_proof', bankProof as Blob);
  }

  let url = '';
  let response: responseDataProps;
  switch (travelPurpose) {
    case '1':
      formData.append('nagarita', nagarita as Blob);
      formData.append('write_up', writeUp as Blob);
      url = `${BASE_URL}createNocDoc-GeneralTourist`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '2':
      formData.append(
        'family_relation_document',
        familyRelationDocument as Blob
      );
      formData.append('relative_passport', RelativePassport as Blob);
      formData.append('relative_nagarita', relativeNagarita as Blob);
      formData.append('sponsorship_letter', sponsorshipLetter as Blob);

      url = `${BASE_URL}createNocDoc-MedicalPurpose`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '3':
      formData.append('ministry_letter', ministryLetter as Blob);
      formData.append('invitation_letter', invitationLetter as Blob);

      url = `${BASE_URL}createNocDoc-GovtWork`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '4':
      formData.append('gats_offer_letter', gatsOfferLetter as Blob);
      formData.append('application_of_purpose', purposeApplication as Blob);
      url = `${BASE_URL}createNocDoc-WTOGATS`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '5':
      formData.append('edu_offer_letter', eduOfferLetter as Blob);
      formData.append('marksheet', marksheet as Blob);
      formData.append('transfer_certificate', transferCertificate as Blob);
      url = `${BASE_URL}createNocDoc-EducationalPurpose`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '6':
      formData.append('write_up_by_landlord', landlordWriteup as Blob);
      url = `${BASE_URL}createNocDoc-CreateNocDocWorkInIndia`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '7':
      formData.append('offer_letter', offerLetter as Blob);
      url = `${BASE_URL}createNocDoc-WorkingVisa`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;
  }
};
