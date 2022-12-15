import { BASE_URL } from '@content/api-urls';
import { PostData } from './fetcher';

export interface CheckTravelProps {
  profileId: string;
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
  profileId,
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
  formData.append('profile_id', profileId);
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
  switch (travelPurpose) {
    case '1':
      formData.append('nagarita', nagarita as Blob);
      formData.append('write_up', writeUp as Blob);

      const url = `${BASE_URL}createNocDocTouristByEmp`;
      const returnValue = await PostData(token, url, formData);
      return returnValue == 1 ? 1 : 0;

    case '2':
      formData.append(
        'family_relation_document',
        familyRelationDocument as Blob
      );
      formData.append('relative_passport', RelativePassport as Blob);
      formData.append('relative_nagarita', relativeNagarita as Blob);
      formData.append('sponsorship_letter', sponsorshipLetter as Blob);

      const url2 = `${BASE_URL}createNocDocMedicalPurposeByEmp`;
      const returnValue2 = await PostData(token, url2, formData);
      return returnValue2 == 1 ? 1 : 0;

    case '3':
      formData.append('ministry_letter', ministryLetter as Blob);
      formData.append('invitation_letter', invitationLetter as Blob);

      const url3 = `${BASE_URL}createNocGovtWorkByEmp`;
      const returnValue3 = await PostData(token, url3, formData);
      return returnValue3 == 1 ? 1 : 0;

    case '4':
      formData.append('gats_offer_letter', gatsOfferLetter as Blob);
      formData.append('application_of_purpose', purposeApplication as Blob);
      const url4 = `${BASE_URL}createNocWTOGATSByEmp`;
      const returnValue4 = await PostData(token, url4, formData);
      return returnValue4 == 1 ? 1 : 0;

    case '5':
      formData.append('edu_offer_letter', eduOfferLetter as Blob);
      formData.append('marksheet', marksheet as Blob);
      formData.append('transfer_certificate', transferCertificate as Blob);

      const url5 = `${BASE_URL}createNocEducationalPurposeByEmp`;
      const returnValue5 = await PostData(token, url5, formData);
      return returnValue5 == 1 ? 1 : 0;

    case '6':
      formData.append('write_up_by_landlord', landlordWriteup as Blob);

      const url6 = `${BASE_URL}createNocDocWorkInIndiaByEmp`;
      const returnValue6 = await PostData(token, url6, formData);
      return returnValue6 == 1 ? 1 : 0;

    case '7':
      formData.append('offer_letter', offerLetter as Blob);

      const url7 = `${BASE_URL}createNocDocWorkingVisaByEmp`;
      const returnValue7 = await PostData(token, url7, formData);
      return returnValue7 == 1 ? 1 : 0;
  }
};
