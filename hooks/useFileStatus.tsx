import BadgePill from '@components/citizen/nocDetail/BadgePill';
import React, { useCallback } from 'react';

export const PaymentFileStatus = ({ status }: { status: string }) => {
  const fileDocStatus = useCallback((value: string) => {
    if (value == 'true') return <BadgePill label="Approved" color="green" />;
    else if (value == 'false')
      return <BadgePill label="Rejected" color="red" />;
    else return <BadgePill label="Pending" color="blue" />;
  }, []);
  return <div>{fileDocStatus(status)}</div>;
};

export const PaymentVerifyStatus = ({ status }: { status: string }) => {
  const paymentStatus = useCallback((value: string) => {
    if (value == '3') return <BadgePill label="Approved" color="green" />;
    else if (value == '2') return <BadgePill label="Rejected" color="red" />;
    else return <BadgePill label="Pending" color="blue" />;
  }, []);
  return <div>{paymentStatus(status)}</div>;
};

export const VerificationStatus = ({ status }: { status: string }) => {
  const fileDocStatus = useCallback((value: string) => {
    if (value == '3') return <BadgePill label="Approved" color="green" />;
    else if (value == '2') return <BadgePill label="Rejected" color="red" />;
    else return <BadgePill label="Pending" color="blue" />;
  }, []);
  return <div>{fileDocStatus(status)}</div>;
};

const FileStatus = ({ status }: { status: string }) => {
  const fileDocStatus = useCallback((value: string) => {
    if (value == '3') return <BadgePill label="Approved" color="green" />;
    else if (value == '2') return <BadgePill label="Rejected" color="red" />;
    else return <BadgePill label="Pending" color="blue" />;
  }, []);
  return <div>{fileDocStatus(status)}</div>;
};

export default FileStatus;
