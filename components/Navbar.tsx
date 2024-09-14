"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsHandbag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import { useShoppingCart } from "use-shopping-cart";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
  { name: "Ai✨", href: "/Ai" },
];
export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick, cartCount } = useShoppingCart();
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
                <button
                  className="hover:text-[#46d729] text-white text-xl "
                  onClick={() => handleCartClick()}
                >
                  <BsHandbag />
                </button>
                <span className="absolute -bottom-2 right-2 rounded-full px-[3px] font-bold bg-[#46d729] text-[12px] w-4 text-white ">
                  {cartCount == 0 ? "0 " : cartCount}
                </span>
              </div>
              <div className="hover:text-[#46d729]  text-xl text-white">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FaRegUser />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-7 rounded-xl pointer">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleCartClick}>
                      <Link href="/signup">signin</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
