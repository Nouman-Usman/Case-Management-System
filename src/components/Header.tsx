"use client";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Features",
    href: "#",
  },
];

export default function Header() {
  const { authStatus } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-white py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link href={"/"} className="inline-block w-full max-w-[150px]">
            {/* <Logo /> */}
            <h3 className="text-green-500 font-mono text-2xl font-extrabold">Apna Waqeel</h3>
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className={`lg:flex ${isMenuOpen ? "block" : "hidden"} grow items-start lg:items-center`}>
          <ul className="ml-12 inline-flex flex-col lg:flex-row lg:space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-primary py-2 lg:py-0"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`lg:flex ${isMenuOpen ? "block" : "hidden"} space-x-2 mt-4 lg:mt-0`}>
          <Link
            href={authStatus ? "/profile" : "/signup"}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {authStatus ? "Profile" : "Sign up"}
          </Link>
          <Link
            href={authStatus ? "/logout" : "/login"}
            className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {authStatus ? "Logout" : "Log In"}
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden px-4 py-2">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-sm font-semibold text-gray-800 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <Link
              href={authStatus ? "/profile" : "/signup"}
              className="block rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {authStatus ? "Profile" : "Sign up"}
            </Link>
            <Link
              href={authStatus ? "/logout" : "/login"}
              className="block rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {authStatus ? "Logout" : "Log In"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
