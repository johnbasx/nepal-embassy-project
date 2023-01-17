import React, { Dispatch } from 'react';

import EducationalPurpose from './EducationalPurpose';
import GovernmentalWork from './GovernmentalWork';
import MedicalPurpose from './MedicalPurpose';
import { NocFilesProps } from '@content/files-for-noc';
import SkillWorkerProgramme from './SkillWorkerProgramme';
import Tourist from './Tourist';
import WorkingInIndia from './WorkingInIndia';
import WorkingVisa from './WorkingVisa';

const RespectiveFiles: React.FC<{
  travelPurpose: string;
  nocFiles: NocFilesProps;
  setNocFiles: Dispatch<NocFilesProps>;
}> = ({ travelPurpose, nocFiles, setNocFiles }) => {
  let requiredFiles;
  if (travelPurpose == '1') {
    requiredFiles = <Tourist nocFiles={nocFiles} setNocFiles={setNocFiles} />;
  } else if (travelPurpose == '2') {
    requiredFiles = (
      <MedicalPurpose nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  } else if (travelPurpose == '3') {
    requiredFiles = (
      <GovernmentalWork nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  } else if (travelPurpose == '4') {
    requiredFiles = (
      <SkillWorkerProgramme nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  } else if (travelPurpose == '5') {
    requiredFiles = (
      <EducationalPurpose nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  } else if (travelPurpose == '6') {
    requiredFiles = (
      <WorkingInIndia nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  } else if (travelPurpose == '7') {
    requiredFiles = (
      <WorkingVisa nocFiles={nocFiles} setNocFiles={setNocFiles} />
    );
  }
  return <>{requiredFiles}</>;
};

export default RespectiveFiles;
