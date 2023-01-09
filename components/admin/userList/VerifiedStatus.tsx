import React from 'react';
import VerificationStatusPill from './VerificationStatusPill';

const VerifiedStatus = ({ status }: { status?: string }) => {
  if (status == '1') {
    return <VerificationStatusPill label="Pending" color="blue" />;
  } else if (status == '2') {
    return <VerificationStatusPill label="Rejected" color="red" />;
  } else if (status == '3') {
    return <VerificationStatusPill label="Approved" color="green" />;
  } else return <VerificationStatusPill label="Error" color="yellow" />;
};

export default VerifiedStatus;
