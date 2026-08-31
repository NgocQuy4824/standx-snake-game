import Link from "next/link";
import { Header } from "@/components/sites/alpaca-tech/shared/Header";
import { Footer } from "@/components/sites/alpaca-tech/shared/Footer";

function Hero() {
  return (
    <section className="relative bg-[#2d2970] flex justify-center items-center min-h-[100vh] overflow-hidden px-5 lg:px-[76px] pb-[50px] lg:pb-[50px] pt-[100px]">
      {/* subtle animated background — replicates lottie dots */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(116,114,226,0.45) 0%, transparent 45%), radial-gradient(circle at 78% 65%, rgba(241,45,144,0.18) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
        <div className="w-[1200px] h-[700px] rounded-full border border-white/20 blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1288px] flex flex-col justify-end h-full min-h-[calc(100vh-120px)]">
        <div className="max-w-[897px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="font-[var(--font-montserrat)] text-white text-[28px] sm:text-[42px] lg:text-[50px] font-bold leading-[1.6] tracking-[0.04em]">
            Beyond Limits in <br />
            Finance with Data Science
          </h1>
          <p className="hidden lg:block text-white text-sm leading-[2] tracking-[0.04em] mt-4 max-w-[820px] font-[var(--font-noto-sans-jp)]">
            AlpacaTech is a technology company that develops solutions for investment management, research, analysis and system integration for the financial industry. <br />
            We combine cutting-edge technology with financial expertise to provide solutions that meet our customers&apos; high standards.
          </p>
          <p className="lg:hidden text-white text-xs leading-[2] tracking-[0.04em] mt-4 font-[var(--font-noto-sans-jp)]">
            AlpacaTech is a technology company that develops solutions for investment management, research, analysis and system integration for the financial industry.
            <br />
            We combine cutting-edge technology with financial expertise to provide solutions that meet our customers&apos; high standards.
          </p>

          <Link
            href="/en#contact"
            className="mt-8 inline-flex items-center justify-between gap-3 bg-white rounded-lg px-6 py-[17px] w-full lg:w-[280px] hover:bg-[#7472e2] group transition-colors duration-300"
          >
            <span className="text-[#2d2970] group-hover:text-white text-sm font-bold tracking-[0.04em] transition-colors">CONTACT</span>
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_53ad8034-be39-43e4-a7ff-6ee82c06d5c3.svg"
              alt=""
              className="w-6 h-6 group-hover:opacity-0 transition-opacity"
            />
          </Link>
        </div>

        {/* floating news card — desktop absolute */}
        <div className="mt-10 lg:mt-0 lg:absolute lg:bottom-8 lg:right-0 flex flex-col gap-3 w-full lg:w-[392px]">
          <Link
            href="/en/news"
            className="flex items-center justify-between gap-4 bg-white rounded-lg px-6 py-4 hover:bg-[#7472e2] group transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[#2d2970]/40 group-hover:text-white/60 text-sm font-normal">2025/4/14 10:00</span>
                <span className="text-[#f12d90] group-hover:text-white text-sm font-bold">NEW</span>
              </div>
              <span className="text-[#333] group-hover:text-white text-sm leading-[1.8] truncate">
                AlpacaTech participates in Snowflake Summit 2025
              </span>
            </div>
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-24x25_7e72b4d9-f9f2-4254-b013-bb2ba8954be7.svg"
              alt=""
              className="w-6 h-6 shrink-0 group-hover:opacity-0 transition-opacity"
            />
          </Link>
          <Link
            href="/en/news"
            className="hidden lg:flex items-center justify-between gap-4 bg-white rounded-lg px-6 py-4 hover:bg-[#7472e2] group transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[#2d2970]/40 group-hover:text-white/60 text-sm">2024/11/20 09:00</span>
                <span className="text-[#f12d90] group-hover:text-white text-sm font-bold">NEW</span>
              </div>
              <span className="text-[#333] group-hover:text-white text-sm leading-[1.8] truncate">
                AlphaCrafter featured at AWS re:Invent 2024
              </span>
            </div>
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-24x25_8d4ecf56-3396-4d0a-b273-349d6c7f8bd6.svg"
              alt=""
              className="w-6 h-6 shrink-0 group-hover:opacity-0 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="flex justify-center bg-[#2d2970] px-0">
      <div className="bg-white rounded-t-[60px] max-[991px]:rounded-t-[40px] w-full flex justify-center px-5 lg:px-[76px] py-[120px] max-[540px]:py-20">
        <div className="w-full max-w-[1288px] flex flex-col gap-16">
          <h2 className="font-[var(--font-montserrat)] text-[#2d2970] text-[72px] max-[991px]:text-[50px] font-extrabold leading-none">
            SOLUTIONS
          </h2>

          <div className="flex flex-col gap-10">
            {/* Data Solution */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-[#333] text-[34px] font-bold leading-[1.4] font-[var(--font-noto-sans-jp)]">DATA SOLUTION</h3>
                <p className="text-[#1f243a] text-base leading-[2] tracking-[0.04em] font-[var(--font-noto-sans-jp)]">
                  As a Snowflake Solutions Partner, AlpacaTech supports clients from environment setup through to data analytics and utilization.
                  <br />
                  We have also developed &quot;AlphaCrafter&quot; — a generative AI data agent operating directly within data warehouses. Utilizing this technology, SBI Securities&apos; product won the Grand Prize at the Japan Financial Innovation Award 2024.
                </p>
                <Link
                  href="/en#data-solution"
                  className="inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] w-fit hover:bg-[#7472e2] transition-colors"
                >
                  <span className="text-sm font-bold tracking-[0.04em]">Learn more</span>
                  <img
                    src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                    alt=""
                    className="w-6 h-6 invert"
                  />
                </Link>
              </div>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1580x900_v-fms_webp_ee0da3ea-4ff8-4991-8b15-6e21fd13bcd4.jpg"
                alt="Data Solution — Snowflake and AlphaCrafter"
                className="flex-1 lg:max-w-[50%] w-full h-auto rounded-2xl object-cover"
              />
            </div>

            {/* AIM */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
              <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1580x900_v-fms_webp_31f15ca1-ecef-4de2-b1f6-3c60fd859499.jpg"
                  alt="AIM investment model"
                  className="w-full h-auto rounded-2xl object-cover lg:hidden"
                />
                <div>
                  <h3 className="text-[#333] text-[34px] font-bold leading-[1.4] font-[var(--font-noto-sans-jp)]">AIM investment model</h3>
                  <p className="text-[#1f243a] text-xs tracking-[0.04em]">(AlpacaTech Investment Management)</p>
                </div>
                <p className="text-[#1f243a] text-base leading-[2] tracking-[0.04em] font-[var(--font-noto-sans-jp)]">
                  AlpacaTech provides asset management solutions that meet our clients&apos; needs, using cutting-edge research and medium to long term market forecasts that utilize our independently developed AI algorithms.
                  <br />
                  <br />
                  AIM is used in the AI investment &ldquo;ROBOPRO&rdquo;, which was developed in collaboration with FOLIO and has over ¥40B in AUM.
                </p>
                <Link
                  href="/en#aim"
                  className="inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] w-fit hover:bg-[#7472e2] transition-colors"
                >
                  <span className="text-sm font-bold tracking-[0.04em]">Learn more</span>
                  <img
                    src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                    alt=""
                    className="w-6 h-6 invert"
                  />
                </Link>
              </div>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1580x900_v-fms_webp_31f15ca1-ecef-4de2-b1f6-3c60fd859499.jpg"
                alt="AIM investment model"
                className="hidden lg:block flex-1 max-w-[50%] w-full h-auto rounded-2xl object-cover order-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyTeaser() {
  return (
    <section className="flex justify-center bg-white px-5 lg:px-[76px] py-[120px] max-[540px]:py-20">
      <div className="relative w-full max-w-[1288px] bg-[#2d2970] rounded-[60px] max-[991px]:rounded-[40px] overflow-hidden flex flex-col items-center justify-center px-10 lg:px-[75px] py-[120px]">
        <img
          src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1440x634_v-fms_webp_eaeead84-56d3-4d35-9a03-82800126eb5f.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#2d2970]/50" />
        <div className="relative z-10 flex flex-col items-center gap-10 max-w-[1100px] text-center">
          <h2 className="font-[var(--font-montserrat)] text-white text-[72px] max-[991px]:text-[50px] font-extrabold leading-none">COMPANY</h2>
          <p className="text-white text-base leading-[2] tracking-[0.04em] text-center font-[var(--font-noto-sans-jp)]">
            AlpacaTech is a group company of FOLIO Holdings.
            <br className="hidden lg:block" />
            As a member of the FOLIO Group, which aims to create new financial solutions and realize a prosperous future, we combine our AI and system development technologies with our financial expertise to provide cutting-edge technology that meets the needs of our customers.
          </p>
          <Link
            href="/en/company"
            className="inline-flex items-center justify-between gap-3 bg-white text-[#2d2970] rounded-lg px-6 py-[17px] w-[280px] hover:bg-[#7472e2] hover:text-white group transition-colors"
          >
            <span className="text-sm font-bold tracking-[0.04em]">Read more</span>
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-24x24_53ad8034-be39-43e4-a7ff-6ee82c06d5c3.svg"
              alt=""
              className="w-6 h-6 group-hover:opacity-0 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecruitTeaser() {
  return (
    <section className="flex justify-center bg-white px-5 lg:px-[76px] py-0 pb-[120px]">
      <div className="bg-white rounded-[60px] max-[991px]:rounded-[40px] border border-[#efeeff] w-full max-w-[1288px] flex flex-col items-center px-10 lg:px-8 py-[120px] gap-10">
        <h2 className="font-[var(--font-montserrat)] text-[#2d2970] text-[72px] max-[991px]:text-[50px] font-bold leading-none self-start w-full">RECRUIT</h2>
        <img
          src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1289x473_v-fms_webp_d751e825-390f-47ac-ae9e-7fcc038798ce.jpg"
          alt="Team at AlpacaTech"
          className="w-full h-auto rounded-2xl object-cover"
        />
        <p className="text-[#1f243a] text-base leading-[1.8] tracking-[0.04em] font-[var(--font-noto-sans-jp)] self-start">
          AlpacaTech values five principles: &ldquo;Strive for Excellence in Quality&rdquo;, &ldquo;Think and Act Bold&rdquo;, &ldquo;Stronger Together&rdquo;, &ldquo;Integrity and Trust&rdquo; and &ldquo;Embrace Change&rdquo;.
          <br />
          <br />
          We look forward to working with future colleagues who share these principles and can help us provide new value that goes Beyond Limits.
        </p>
        <Link
          href="/en/recruit"
          className="inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] w-full lg:w-[280px] hover:bg-[#7472e2] transition-colors self-start"
        >
          <span className="text-sm font-bold tracking-[0.04em]">Read more</span>
          <img
            src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
            alt=""
            className="w-6 h-6 invert"
          />
        </Link>
      </div>
    </section>
  );
}

function InfiniteMarquee() {
  return (
    <div className="bg-white py-10 lg:py-[60px] overflow-hidden flex justify-center">
      <div className="w-[120vw] max-[991px]:w-[230vw] max-[540px]:w-[280vw] -rotate-0 overflow-hidden">
        <div className="flex animate-[marquee_18s_linear_infinite]">
          <img
            src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-1671x119_6819cf0b-b74a-4a81-a34a-1bea962cd000.svg"
            alt="Beyond Limits in Finance with Data Science — repeated"
            className="h-auto w-full shrink-0"
          />
          <img
            src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-1671x119_6819cf0b-b74a-4a81-a34a-1bea962cd000.svg"
            alt=""
            aria-hidden
            className="h-auto w-full shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

function NewsTeaser() {
  const news = [
    { date: "2025.04.14", title: "AlpacaTech participates in Snowflake Summit 2025", href: "/en/news" },
    { date: "2024.11.20", title: "AlphaCrafter featured at AWS re:Invent 2024 — Generative AI data agent demo", href: "/en/news" },
  ];
  return (
    <section className="flex justify-center bg-[#2d2970] px-0 pt-0">
      <div className="bg-white rounded-t-[60px] max-[991px]:rounded-t-[40px] w-full flex justify-center px-5 lg:px-[76px] py-[120px]">
        <div className="w-full max-w-[1288px] flex flex-col lg:flex-row gap-10 lg:gap-14">
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-10">
            <h2 className="font-[var(--font-montserrat)] text-[#2d2970] text-[72px] max-[991px]:text-[50px] font-extrabold leading-none">NEWS</h2>
            <Link
              href="/en/news"
              className="hidden lg:inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] hover:bg-[#7472e2] transition-colors"
            >
              <span className="text-sm font-bold tracking-[0.04em]">View All</span>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                alt=""
                className="w-6 h-6 invert"
              />
            </Link>
          </div>

          <ul className="flex-1 flex flex-col">
            {news.map((n) => (
              <li key={n.date} className="border-b border-[#efeeff] py-6 flex items-center justify-between gap-6 group">
                <Link href={n.href} className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 flex-1 min-w-0">
                  <div className="flex items-center gap-2 shrink-0 w-[220px]">
                    <span className="text-[#2d2970]/60 text-lg font-normal font-[var(--font-montserrat)]">{n.date}</span>
                    <span className="text-[#f12d90] text-lg font-bold font-[var(--font-montserrat)] tracking-[0.05em]">NEW</span>
                  </div>
                  <span className="text-[#1f243a] text-[15px] leading-[1.8] group-hover:underline underline-offset-2">{n.title}</span>
                </Link>
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-24x25_7e72b4d9-f9f2-4254-b013-bb2ba8954be7.svg"
                  alt=""
                  className="w-6 h-6 shrink-0"
                />
              </li>
            ))}
            <Link
              href="/en/news"
              className="lg:hidden mt-8 inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] hover:bg-[#7472e2] transition-colors"
            >
              <span className="text-sm font-bold tracking-[0.04em]">View All</span>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                alt=""
                className="w-6 h-6 invert"
              />
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function EnPage() {
  return (
    <div className="bg-[#2d2970] min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <SolutionsSection />
        <CompanyTeaser />
        <RecruitTeaser />
        <InfiniteMarquee />
        <NewsTeaser />
      </main>
      <Footer />
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
