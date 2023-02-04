import React, { useCallback } from 'react';
import {
  TbBan,
  TbClipboardOff,
  TbFileUpload,
  TbShieldCheck,
} from 'react-icons/tb';

import { nocDocumentType } from '@utils/interface';

const NocStatusPill = ({
  verified_status,
}: {
  verified_status: nocDocumentType['verified_status'];
}) => {
  // Status = 1
  const PendingPill = () => (
    <div className="flex items-center justify-center px-3 py-1 space-x-1 text-2xs lg:text-sm text-white bg-gray-400 rounded-full">
      <TbClipboardOff className="w-4 h-4" />
      <span>Pending</span>
    </div>
  );

  // Status = 2
  const RejectedPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white bg-red-400 rounded-full">
      <TbBan className="w-5 h-5" />
      <span>Rejected</span>
    </div>
  );

  //   Status = 3
  const ApprovedPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white bg-teal-500 rounded-full">
      <TbShieldCheck className="w-5 h-5" />
      <span>Approved</span>
    </div>
  );

  const nocDocStatus = useCallback((value?: string) => {
    if (value == '3') return <ApprovedPill />;
    else if (value == '1') return <PendingPill />;
    else return <RejectedPill />;
  }, []);
  return <>{nocDocStatus(verified_status)}</>;
};

export default NocStatusPill;
