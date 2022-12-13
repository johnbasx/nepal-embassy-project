import Image from 'next/image';
import React from 'react';

const HeadSection = () => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <Image
          height={80}
          width={80}
          objectFit="contain"
          src="/images/logo-only.jpg"
          alt="cirtificate"
        />
        <p className="font-bold text-2xs lg:text-lg text-gray-700">
          Ref. No. 079/80/GR-TUE/9980
        </p>
      </div>
      {/* <div className="mt-24">
        <Image
          height={150}
          width={150}
          src="/images/sample_logo_center.png"
          alt="cirtificate"
        />
      </div> */}
      {/* <Image
       
        height={200}
        width={200}
        src="/images/sample_logo.jpg"
        alt="cirtificate"
      /> */}
      <div>
        <div className="relative h-20">
          <Image
            priority
            objectFit="contain"
            layout="fill"
            src="/images/np-logo.png"
            alt="cirtificate"
          />
        </div>
        <p className="font-bold  text-2xs lg:text-lg text-gray-700">
          Date: 31/10/2022
        </p>
      </div>
    </div>
  );
};

export default HeadSection;
