import Link from "next/link";
import { Header } from "@/components/sites/alpaca-tech/shared/Header";
import { Footer } from "@/components/sites/alpaca-tech/shared/Footer";

function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="flex items-center gap-2 text-xs tracking-[0.04em]">
      <Link href="/en" className="text-white hover:opacity-70 transition-opacity">
        TOP
      </Link>
      <span className="text-white/50">/</span>
      <span className="text-white/50">{current}</span>
    </div>
  );
}

const newsItems = [
  { date: "2025.04.14", title: "AlpacaTech participates in Snowflake Summit 2025 — Booth demo of AlphaCrafter", featured: true },
  { date: "2025.03.17", title: "AlphaCrafter wins Grand Prize at the 3rd Google Cloud Generative AI Innovation Awards", featured: true },
  { date: "2024.11.20", title: "AlphaCrafter featured at AWS re:Invent 2024 — live demo of generative AI data agent", featured: false },
  { date: "2024.09.10", title: "SBI Securities' AlphaCrafter-powered product wins Japan Financial Innovation Award 2024 Grand Prize", featured: false },
  { date: "2023.05.16", title: "Financial Services Agency evaluates ROBOPRO as No. 1 in cumulative return and Sharpe ratio", featured: false },
  { date: "2023.02.14", title: "AlpacaTech becomes Snowflake Solutions Partner", featured: false },
];

export default function NewsPage() {
  return (
    <div className="bg-[#2d2970] min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-[#2d2970] flex justify-center px-5 lg:px-[76px] pt-[114px] pb-8">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 25% 30%, rgba(116,114,226,0.45) 0%, transparent 45%), radial-gradient(circle at 78% 65%, rgba(241,45,144,0.18) 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 w-full max-w-[1288px] flex flex-col gap-10">
          <h1 className="font-[var(--font-montserrat)] text-white text-[50px] lg:text-[100px] font-bold leading-none">NEWS</h1>
          <div className="flex justify-end">
            <Breadcrumb current="NEWS" />
          </div>
        </div>
      </section>

      {/* White card */}
      <div className="flex justify-center bg-[#2d2970] px-0">
        <div className="bg-white rounded-t-[60px] max-[991px]:rounded-t-[40px] w-full flex justify-center px-5 lg:px-[76px] py-[100px] max-[540px]:py-20">
          <div className="w-full max-w-[952px] flex flex-col gap-6">
            <ul className="flex flex-col">
              {newsItems.map((n) => (
                <li
                  key={n.date + n.title.slice(0, 20)}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6 py-6 border-b border-[#efeeff] group"
                >
                  <Link href="/en/news" className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 flex-1 min-w-0">
                    <div className="flex items-center gap-2 shrink-0 lg:w-[220px]">
                      <span className={`text-lg leading-[1.4] font-[var(--font-montserrat)] ${n.featured ? "text-[#2d2970]/60" : "text-[#2d2970]"}`}>{n.date}</span>
                      <span className="text-[#f12d90] text-lg font-bold tracking-[0.05em] font-[var(--font-montserrat)]">NEW</span>
                    </div>
                    <span className="text-[#1f243a] text-[15px] leading-[1.8] group-hover:underline underline-offset-2 flex-1">{n.title}</span>
                  </Link>
                  <img
                    src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-24x25_8d4ecf56-3396-4d0a-b273-349d6c7f8bd6.svg"
                    alt=""
                    className="w-6 h-6 shrink-0 hidden lg:block"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>

            <button className="self-center mt-4 inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] w-full lg:w-auto hover:bg-[#7472e2] transition-colors">
              <span className="text-sm font-bold tracking-[0.04em]">View More</span>
              <img
                src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                alt=""
                className="w-6 h-6 invert rotate-90"
              />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
