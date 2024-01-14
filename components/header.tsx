import { SignInButton, SignedOut } from "@clerk/nextjs";
import { SignIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center bg-red-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black">
            <Image
              src={
                "https://storage.googleapis.com/code.snapengage.com/cd/5198260222296064/1696540761837.png"
              }
              alt="logo"
              className="invert"
              height={50}
              width={50}
            />
          </div>
          <h1 className="text-white font-bold text-xl">DumpDrive</h1>
        </Link>

        <div className="flex">
          
          <ThemeToggle />

          <div className="flex px-5 items-center text-white hover:bg-red-800 rounded-sm">
            <UserButton afterSignOutUrl="/" />

            <SignedOut>
              <SignInButton  afterSignInUrl="/dashboard" mode="modal" />
            </SignedOut>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
