"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-[1360px] px-[76px] py-6 max-[991px]:px-8 max-[540px]:px-5">
        {/* Logo */}
        <Link href="/en" className="flex items-center gap-[5px] shrink-0">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-45x50_030be4ed-718d-43a1-829f-973b0b230ea6.svg"
            alt="AlpacaTech icon"
            className="h-[50px] w-[44px] max-[991px]:h-[30px] max-[991px]:w-[35px] object-contain"
          />
          <img
            src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-152x50_f6b98fc6-7513-4527-81e0-cadcd7b6be47.svg"
            alt="AlpacaTech"
            className="h-[50px] w-[152px] max-[991px]:h-[30px] max-[991px]:w-[108px] object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-10">
            <Link
              href="/en#solutions"
              className="group flex flex-col items-start"
            >
              <span className="text-white text-[14px] font-bold tracking-[0.04em] leading-[1.4] py-[5px]">
                SOLUTION
              </span>
              <span className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex flex-col gap-0 items-start px-4 py-[11px]"
            >
              <span className="text-white text-[14px] font-bold leading-[1.6]">Japanese</span>
              <span className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/en#contact"
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 hover:bg-[#7472e2] group transition-colors duration-300"
            >
              <span className="text-[#2d2970] group-hover:text-white text-[14px] font-bold tracking-[0.04em] transition-colors">
                CONTACT
              </span>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_53ad8034-be39-43e4-a7ff-6ee82c06d5c3.svg"
                alt=""
                className="w-6 h-6 group-hover:opacity-0 transition-opacity"
              />
            </Link>
          </div>
        </nav>

        {/* Hamburger — visible on tablet/mobile */}
        <button
          className="lg:hidden flex flex-col items-end justify-center gap-[5px] p-2"
          aria-label="Open menu"
        >
          <span className="block h-[3px] w-[30px] rounded-full bg-white" />
          <span className="block h-[3px] w-[22px] rounded-full bg-white" />
          <span className="block h-[3px] w-[14px] rounded-full bg-white" />
        </button>
      </div>
    </header>
  );
}
