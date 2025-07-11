import Image from 'next/image';

export default function Logo() {
  return (
    <div className="grid grid-cols-3 items-center space-x-2 leading-none text-white">
      {/* Vertical Routify Text */}
      <div className="p-1">
        <Image
          src="/routify_text.png"
          width={360}
          height={760}
          className="hidden md:block"
          alt="Routify Logo"
        />
      </div>
      {/* Logo Image */}
      <div className="col-span-2">
        <Image
          src="/routify_logo.png"
          width={760}
          height={760}
          className="hidden md:block"
          alt="Routify Logo"
        />
      </div>
    </div>
  );
}
