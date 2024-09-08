"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsHandbag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
  { name: "Ai✨", href: "/Ai" },
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center items-center mt-4  ">
      <div className=" z-[99] top-0 fixed ">
        <header className=" border dark:border-none bg-black shadow-md lg:max-w-fit rounded-full ">
          <div className="flex justify-between px-8 py-4 sm:px-6  items-center ">
            <Link href="/">
              <h1 className="text-2xl mx-4 font-bold text-[#46d729]">
                Cool<span className="">store</span>
              </h1>
            </Link>
            <nav className="hidden gap-6 lg:flex 2xl:ml-16 mr-6">
              {links.map((link, idx) => (
                <div key={idx}>
                  {pathname === link.href ? (
                    <Link
                      className="text-[#46d729] font-semibold text-md"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      className=" text-gray-500 font-semibold text-md"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div>
              <ModeToggle />
            </div>
            <div className="flex mx-4  text-gray-800 gap-3 ">
              <div className="relative">
                <Link
                  href="/cart"
                  className="hover:text-[#46d729] text-white text-xl "
                >
                  <BsHandbag />
                </Link>
                <span className="absolute -bottom-2 right-2 rounded-full px-[2px] font-bold bg-[#46d729] text-[12px] text-black ">
                  01
                </span>
              </div>
              <Link
                href="/profile"
                className="hover:text-[#46d729]  text-xl text-white"
              >
                <FaRegUser />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
