import { BASE_URL } from '@content/api-urls';
import { NocFilesProps } from 'content/files-for-noc';
import { PostData } from './fetcher';

export interface responseDataProps {
  response: {
    data: { doc_id: string };
  };
  returnValue: number;
}

export interface CheckTravelProps {
  relativeId: string;
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
  nocFiles: NocFilesProps;
  token?: string;
}
export const CheckTravelPurpose = async ({
  relativeId,
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
  nocFiles,
  token,
}: CheckTravelProps) => {
  let formData = new FormData();
  formData.append('relative_profile', relativeId);
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

  formData.append('visa', nocFiles.visa as Blob);
  formData.append('passport', nocFiles.passport as Blob);
  formData.append('air_ticket', nocFiles.airTicket as Blob);

  if (livingInIndia) {
    formData.append('proof_of_residence', nocFiles.residenceProof as Blob);
  }
  if (travelType == 'Direct') {
    formData.append('bank_proof', bankProof as Blob);
  }

  let url = '';
  let response: responseDataProps;
  switch (travelPurpose) {
    case '1':
      formData.append('nagarita', nocFiles.nagarita as Blob);
      formData.append('write_up', nocFiles.nagarita as Blob);
      url = `${BASE_URL}createNocDoc-GeneralTourist`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '2':
      formData.append(
        'family_relation_document',
        nocFiles.familyRelationDocument as Blob
      );
      formData.append('relative_passport', nocFiles.relativePassport as Blob);
      formData.append('relative_nagarita', nocFiles.relativeNagarita as Blob);
      formData.append('sponsorship_letter', nocFiles.sponsorshipLetter as Blob);

      url = `${BASE_URL}createNocDoc-MedicalPurpose`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '3':
      formData.append('ministry_letter', nocFiles.ministryLetter as Blob);
      formData.append('invitation_letter', nocFiles.invitationLetter as Blob);

      url = `${BASE_URL}createNocDoc-GovtWork`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '4':
      formData.append('gats_offer_letter', nocFiles.gatsOfferLetter as Blob);
      formData.append(
        'application_of_purpose',
        nocFiles.purposeApplication as Blob
      );
      url = `${BASE_URL}createNocDoc-WTOGATS`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '5':
      formData.append('edu_offer_letter', nocFiles.eduOfferLetter as Blob);
      formData.append('marksheet', nocFiles.marksheet as Blob);
      formData.append(
        'transfer_certificate',
        nocFiles.transferCertificate as Blob
      );
      url = `${BASE_URL}createNocDoc-EducationalPurpose`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '6':
      formData.append('write_up_by_landlord', nocFiles.landlordWriteup as Blob);
      url = `${BASE_URL}createNocDoc-CreateNocDocWorkInIndia`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;

    case '7':
      formData.append('offer_letter', nocFiles.offerLetter as Blob);
      url = `${BASE_URL}createNocDoc-WorkingVisa`;
      response = await PostData(token, url, formData);
      return response.returnValue == 1 ? response.response : 0;
  }
};
