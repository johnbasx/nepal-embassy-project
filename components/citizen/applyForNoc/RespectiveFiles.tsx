import React, { Dispatch } from 'react';

import EducationalPurpose from './EducationalPurpose';
import GovernmentalWork from './GovernmentalWork';
import MedicalPurpose from './MedicalPurpose';
import SkillWorkerProgramme from './SkillWorkerProgramme';
import Tourist from './Tourist';
import WorkingInIndia from './WorkingInIndia';
import WorkingVisa from './WorkingVisa';

const RespectiveFiles: React.FC<{
  travelPurpose: string;
  setFlightBooking: Dispatch<File>;
  setNagarita: Dispatch<File>;
  setWriteUp: Dispatch<File>;
  // living in India
  setRentalAgreement: Dispatch<File>;
  setOfferLetter: Dispatch<File>;
  setLandlordWriteup: Dispatch<File>;
  setDeparture: Dispatch<File>;
  setArrivalDocument: Dispatch<File>;
  setfamilyRelationDocument: Dispatch<File>;
  setRelativePassport: Dispatch<File>;
  setRelativeNagarita: Dispatch<File>;
  setSponsorshipLetter: Dispatch<File>;
  setClearanceDocument: Dispatch<File>;
  setMinistryLetter: Dispatch<File>;
  setInvitationLetter: Dispatch<File>;
  setGatsOfferLetter: Dispatch<File>;
  setPurposeApplication: Dispatch<File>;
  setEduOfferLetter: Dispatch<File>;
  setMarksheet: Dispatch<File>;
  setTransferCertificate: Dispatch<File>;
}> = ({
  travelPurpose,
  setFlightBooking,
  setNagarita,
  setWriteUp,
  // living in India
  setRentalAgreement,
  setOfferLetter,
  setLandlordWriteup,
  setDeparture,
  setArrivalDocument,
  setfamilyRelationDocument,
  setRelativePassport,
  setRelativeNagarita,
  setSponsorshipLetter,
  setClearanceDocument,
  setMinistryLetter,
  setInvitationLetter,
  setGatsOfferLetter,
  setPurposeApplication,
  setEduOfferLetter,
  setMarksheet,
  setTransferCertificate,
}) => {
  let requiredFiles;
  if (travelPurpose == '1') {
    requiredFiles = (
      <Tourist
        setFlightBooking={setFlightBooking}
        setNagarita={setNagarita}
        setWriteUp={setWriteUp}
      />
    );
  } else if (travelPurpose == '2') {
    requiredFiles = (
      <MedicalPurpose
        setfamilyRelationDocument={setfamilyRelationDocument}
        setRelativePassport={setRelativePassport}
        setRelativeNagarita={setRelativeNagarita}
        setSponsorshipLetter={setSponsorshipLetter}
      />
    );
  } else if (travelPurpose == '3') {
    requiredFiles = (
      <GovernmentalWork
        setMinistryLetter={setMinistryLetter}
        setInvitationLetter={setInvitationLetter}
      />
    );
  } else if (travelPurpose == '4') {
    requiredFiles = (
      <SkillWorkerProgramme
        setGatsOfferLetter={setGatsOfferLetter}
        setPurposeApplication={setPurposeApplication}
      />
    );
  } else if (travelPurpose == '5') {
    requiredFiles = (
      <EducationalPurpose
        setEduOfferLetter={setEduOfferLetter}
        setMarksheet={setMarksheet}
        setTransferCertificate={setTransferCertificate}
      />
    );
  } else if (travelPurpose == '6') {
    requiredFiles = <WorkingInIndia setLandlordWriteup={setLandlordWriteup} />;
  } else if (travelPurpose == '7') {
    requiredFiles = <WorkingVisa setOfferLetter={setOfferLetter} />;
  }
  return <>{requiredFiles}</>;
};

export default RespectiveFiles;
