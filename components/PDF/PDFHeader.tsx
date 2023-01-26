import Image from 'next/image';
import Logo from './Logo';
const embassyLogo = '/noc/embassy-logo.png';
const embassyTag = '/noc/embassy-tag.png';

const PdfHeader = () => (
  <div className="flex items-center justify-between px-24 pt-6 pb-2">
    <img
      // width={100}
      // height={100}
      src={embassyLogo}
      className="object-contain w-auto h-24"
      alt="embassy-logo"
    />
    <img
      // width={100}
      // height={100}
      src={embassyTag}
      className="object-contain w-auto h-20"
      alt="embassy-tag"
    />
  </div>
);

export default PdfHeader;
