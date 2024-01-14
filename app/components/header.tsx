import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center bg-red-700">
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-black">
            <Image 
            src={"https://storage.googleapis.com/code.snapengage.com/cd/5198260222296064/1696540761837.png"}
            alt="logo"
            className="invert"
            height={50}
            width={50} />
            </div>
            <h1 className="text-white font-bold text-xl">DumpDrive</h1>
        </Link>
      </header>
    </>
  );
};

export default Header;
