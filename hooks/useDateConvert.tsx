import React, { useEffect, useState } from 'react';

export type DateConvertProps = {
  date: Date | string;
};

const DateConvert = ({ date }: DateConvertProps) => {
  const [dateData, setDateData] = useState<Date>(new Date(date));
  const [returnData, setReturnData] = useState<string>();

  useEffect(() => {
    setReturnData(dateData.toLocaleDateString('en-US'));
  }, [date]);

  return returnData;
};

export default DateConvert;
