import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#2d2970] w-full flex justify-center px-4 sm:px-8 lg:px-[76px] pt-16 pb-8">
      <div className="w-full max-w-[1288px] flex flex-col">
        {/* Top row: logos + back-to-top */}
        <div className="flex flex-row justify-between items-center h-[98px] max-[540px]:h-auto max-[540px]:flex-col max-[540px]:gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-45x50_030be4ed-718d-43a1-829f-973b0b230ea6.svg"
              alt="AlpacaTech"
              className="h-[50px] w-auto"
            />
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-152x50_f6b98fc6-7513-4527-81e0-cadcd7b6be47.svg"
              alt="AlpacaTech"
              className="h-[50px] w-auto"
            />
          </div>
          <a
            href="#"
            className="w-20 h-20 hover:opacity-50 transition-opacity max-[540px]:hidden"
            aria-label="Back to top"
          >
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-80x80_27b377c2-d2d6-4216-a3dd-dd4a432efac9.svg"
              alt=""
              className="w-full h-full"
            />
          </a>
        </div>

        {/* Middle row */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mt-16">
          {/* Group companies */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-xs font-bold tracking-[0.04em]">Group Companies</span>
            <div className="flex items-center gap-10 max-[540px]:flex-col max-[540px]:items-start max-[540px]:gap-6">
              <a href="https://www.folio-hd.co.jp/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-280x28_885dcb01-32d1-4f35-aacf-3034aa67ed45.svg"
                  alt="FOLIO Holdings"
                  className="h-7 w-auto"
                />
              </a>
              <span className="w-px h-4 bg-white max-[540px]:hidden" />
              <a href="https://folio-sec.com/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-148x84_8031b235-538f-4137-952e-662848d4d94c.svg"
                  alt="FOLIO"
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Nav + contact + lang */}
          <div className="flex flex-col items-end gap-8 max-[540px]:items-start max-[540px]:w-full">
            <div className="flex items-end gap-10 max-[540px]:flex-col max-[540px]:items-start">
              <Link href="/en#solutions" className="group flex flex-col">
                <span className="text-white text-sm tracking-[0.04em]">SOLUTION</span>
                <span className="h-px w-0 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* CONTACT buttons */}
            <div className="flex items-center gap-4 max-[540px]:w-full max-[540px]:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-medium tracking-[0.04em]">JAPANESE</span>
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_cd52f69d-166e-4375-b9a1-3d44257b4d69.svg"
                  alt=""
                  className="w-6 h-6"
                />
              </div>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                  <img
                    src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-54x46_41ca83f9-0513-4600-8bc6-dc6bc9d7ec19.svg"
                    alt="Instagram"
                    className="h-[46px] w-[54px]"
                  />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">
                  <img
                    src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-48x46_3fb51635-da93-443b-b42c-713b23250931.svg"
                    alt="LinkedIn"
                    className="h-[46px] w-12"
                  />
                </a>
              </div>
              <Link
                href="/en#contact"
                className="hidden lg:flex items-center gap-3 bg-white rounded-lg px-4 py-3 hover:bg-[#7472e2] group transition-colors"
              >
                <span className="text-[#2d2970] group-hover:text-white text-sm font-bold tracking-[0.04em] transition-colors">CONTACT</span>
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_53ad8034-be39-43e4-a7ff-6ee82c06d5c3.svg"
                  alt=""
                  className="w-6 h-6 group-hover:opacity-0 transition-opacity"
                />
              </Link>
            </div>

            <Link
              href="/en#contact"
              className="flex lg:hidden w-full items-center justify-center gap-3 bg-white rounded-lg px-6 py-4"
            >
              <span className="text-[#2d2970] text-sm font-bold tracking-[0.04em]">CONTACT</span>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_53ad8034-be39-43e4-a7ff-6ee82c06d5c3.svg"
                alt=""
                className="w-6 h-6"
              />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6 pt-6 border-t border-[#4b4785]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-10">
              <Link href="/en/privacy-policy" className="text-[#8988a3] text-xs tracking-[0.04em] hover:text-white/50 transition-colors">Privacy Policy</Link>
              <Link href="/en/site-policy" className="text-[#8988a3] text-xs tracking-[0.04em] hover:text-white/50 transition-colors">Site Policy</Link>
              <Link href="/en/security-policy" className="text-[#8988a3] text-xs tracking-[0.04em] hover:text-white/50 transition-colors">Security Policy</Link>
            </div>
            <Link href="/en/email-disclaimer" className="text-[#8988a3] text-xs tracking-[0.04em] hover:text-white/50 transition-colors">SHARING CONFIDENTIAL INFORMATION WITHIN THE GROUP</Link>
            <span className="text-[#8988a3] text-xs tracking-[0.04em] hidden lg:block">©AlpacaTech Co. Ltd. all rights reserved.</span>
          </div>
          <div className="flex flex-col items-end gap-4 lg:max-w-[320px]">
            <p className="text-[#8988a3] text-[10px] leading-[1.8] tracking-[0.04em] text-right max-[540px]:text-left">
              AlpacaTech Co., Ltd.<br />Financial Instruments Business Operator<br />(Investment Advisory and Agency Business)<br />Registration Number 3453<br />Member Association: Japan Investment Advisers Association
            </p>
          </div>
        </div>
        <span className="text-[#666582] text-xs tracking-[0.04em] lg:hidden mt-6">©AlpacaTech Co. Ltd. all rights reserved.</span>
      </div>
    </footer>
  );
}
