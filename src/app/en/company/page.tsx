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

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-14 py-6 border-b border-[#efeeff] last:border-0">
      <div className="flex flex-col gap-2 lg:w-[22%] shrink-0">
        <span className="text-[#333] text-base tracking-[0.04em] leading-[1.6]">{label}</span>
        <span className="block h-px w-full bg-[#7472e2]" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="text-[#333] text-base tracking-[0.04em] leading-[1.6]">{children}</div>
        <span className="block h-px w-full bg-[#efeeff]" />
      </div>
    </div>
  );
}

export default function CompanyPage() {
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
          <h1 className="font-[var(--font-montserrat)] text-white text-[60px] lg:text-[100px] font-bold leading-none">
            COMPANY
          </h1>
          <div className="flex justify-end">
            <Breadcrumb current="COMPANY" />
          </div>
        </div>
      </section>

      {/* Main white card */}
      <div className="flex justify-center bg-[#2d2970] px-0">
        <div className="bg-white rounded-t-[60px] max-[991px]:rounded-t-[40px] w-full flex flex-col items-center gap-16 px-5 lg:px-[76px] py-20">
          {/* Company info */}
          <div className="w-full max-w-[1288px] flex flex-col gap-10">
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-1288x568_v-fms_webp_7ca49a22-4fcb-4fce-92b8-2971466e6190.jpg"
              alt="AlpacaTech team"
              className="w-full h-auto rounded-2xl object-cover"
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
                <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] leading-none font-[var(--font-noto-sans-jp)]">
                  COMPANY INFORMATION
                </h2>
              </div>

              <div className="flex flex-col pt-4">
                <InfoRow label="Company Name">
                  <span>AlpacaTech Co., Ltd.</span>
                </InfoRow>
                <InfoRow label="Date of Establishment">
                  <span>July 8, 2022</span>
                </InfoRow>
                <InfoRow label="Head Office Location">
                  <span>
                    1-6-4 Hirakawacho,
                    <br />
                    Chiyoda-ku,
                    <br />
                    Tokyo 102-0093,
                    <br />
                    H1O Hirakawacho 703
                  </span>
                </InfoRow>
                <InfoRow label="Capital">
                  <span>
                    JPY 10,000,000 <span className="text-sm text-[#333]/70">(as of March 2026)</span>
                  </span>
                </InfoRow>
                <InfoRow label="Representative Director, CEO & CAIO">
                  <span>Tomoya Kitayama</span>
                </InfoRow>
                <InfoRow label="Representative Director, CAO">
                  <span>Maiko Mizuno</span>
                </InfoRow>
                <InfoRow label="Director">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span>Morifumi Yotsumoto</span>
                    <Link href="#" className="text-[#2d2970] text-sm underline underline-offset-4 hover:opacity-60">
                      ブログはこちら
                    </Link>
                  </div>
                </InfoRow>
                <InfoRow label="Director">
                  <span>Kazuyuki Ishikawa</span>
                </InfoRow>
                <InfoRow label="Director">
                  <span>Shinichiro Kai</span>
                </InfoRow>
                <InfoRow label="Standing Corporate Auditor">
                  <span>Kazuhiko Osone</span>
                </InfoRow>
                <InfoRow label="Executive Officer, CTO">
                  <span>Andreas Alexelis</span>
                </InfoRow>
              </div>
            </div>
          </div>

          {/* Company History */}
          <div className="w-full max-w-[1288px] bg-white rounded-[60px] max-[991px]:rounded-[40px] border border-[#efeeff] px-6 lg:px-[76px] py-12 lg:py-[76px] flex flex-col gap-12">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
              <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">Company History</h2>
            </div>
            <ul className="flex flex-col pl-6 border-l-0">
              {[
                { year: "2022.07", text: "AlpacaTech Co., Ltd. established." },
                { year: "2022.10", text: "Registered as Financial Instruments Business Operator (Investment Advisory and Agency Business)." },
                { year: "2023.05", text: "ROBOPRO evaluated as No. 1 in cumulative return and Sharpe ratio by the Financial Services Agency." },
                { year: "2024.11", text: "AlphaCrafter featured at AWS re:Invent 2024." },
                { year: "2025.03", text: 'AlphaCrafter wins Grand Prize at Google Cloud Generative AI Innovation Awards.' },
                { year: "2025.06", text: 'ROBOPRO wins Nikkei Trendy "2025 Robo-Advisor Grand Prize".' },
              ].map((h) => (
                <li key={h.year} className="flex gap-4 py-4 border-t border-dotted border-[#ccc] first:border-0">
                  <span className="text-[#2d2970] text-base font-bold w-[110px] shrink-0">{h.year}</span>
                  <span className="text-[#333] text-base leading-[1.6]">{h.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="w-full max-w-[1288px] flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
              <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">Achievements with Business Partners</h2>
            </div>
            <div className="flex flex-col">
              {[
                { title: "SBI Securities", desc: "Snowflake data platform & AlphaCrafter introduction — Japan Financial Innovation Award 2024 Grand Prize.", meta: "Financial Services / Data Platform" },
                { title: "FOLIO", desc: "Joint development of ROBOPRO — AI-driven asset management with ¥40B+ AUM.", meta: "Asset Management / AI" },
                { title: "MUFG", desc: "Fintech Accelerator Program Runner-up Prize (2017) — AlpacaSearch for kabu.com.", meta: "Fintech / Search" },
              ].map((a) => (
                <div key={a.title} className="flex flex-col lg:flex-row lg:items-center gap-4 py-6 border-t border-dotted border-[#ccc] first:border-t">
                  <div className="lg:w-[32%] bg-[#fafafa] border border-[#e6e6e6] rounded-[64px] px-6 py-4 flex items-center justify-center">
                    <span className="text-[#2d2970] text-lg font-bold tracking-[0.04em] text-center">{a.title}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[#333] text-base leading-[1.6] underline underline-offset-2">{a.desc}</span>
                    <span className="text-[#808080] text-sm">{a.meta}</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="text-[#333] text-sm tracking-[0.04em] text-center">*Includes the achievements of our predecessor company.</span>
          </div>

          {/* Awards */}
          <div className="w-full max-w-[1288px] bg-white rounded-[60px] border border-[#efeeff] px-6 lg:px-[76px] py-12 lg:py-[76px] flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
              <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">Award-winning track record</h2>
            </div>
            <ul className="flex flex-col pl-6">
              {[
                { date: "2017.04.06", title: 'MUFG Fintech Accelerator Program "Runner-up Prize"', desc: "kabu.com Securities announced a partnership with us. We participated in the MUFG Fintech Accelerator Program and won the Runner-up Prize. Later launched AlpacaSearch for kabu.com." },
                { date: "2023.05.16", title: 'Financial Services Agency: "Robopro is No. 1 in Cumulative Return and Sharpe Ratio"', desc: "In the report on KPIs showing investment performance of domestic asset management companies, ROBOPRO was evaluated as No. 1." },
                { date: "2025.03.17", title: "Grand Prize — 3rd Google Cloud Generative AI Innovation Awards", desc: 'Our AI data agent "AlphaCrafter" won the Grand Prize, exploring data warehouses and generating analyses.' },
                { date: "2025.06.05", title: 'Nikkei Trendy "2025 Robo-Advisor Grand Prize"', desc: "ROBOPRO recorded the highest returns among major Robo-Advisors in Nikkei Trendy's comparison (July 2025 issue)." },
              ].map((a) => (
                <li key={a.date} className="flex flex-col lg:flex-row gap-4 py-6 border-t border-dotted border-[#ccc] first:border-0">
                  <span className="text-[#2d2970] text-base font-bold w-[110px] shrink-0">{a.date}</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-[#2e2970] text-xl font-bold leading-[1.4]">{a.title}</h3>
                    <p className="text-[#333] text-base leading-[1.6]">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="w-full max-w-[1288px] bg-white rounded-[60px] overflow-hidden relative h-[567px] flex flex-col justify-end p-8">
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-2400x960_v-frms_webp_44a88171-ab75-4da1-ac69-eed42270853b.png"
              alt="Map — H1O Hirakawacho"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 bg-white rounded-lg flex flex-col lg:flex-row items-center justify-between gap-4 px-8 py-4">
              <span className="text-[#333] text-sm tracking-[0.04em] leading-[2]">1-6-4 Hirakawacho, Chiyoda-ku, Tokyo 102-0093, H1O Hirakawacho 703</span>
              <a
                href="https://maps.google.com/?q=H1O+Hirakawacho+Tokyo"
                target="_blank"
                rel="noreferrer"
                className="bg-[#2d2970] text-white rounded-lg px-6 py-3 text-sm font-medium tracking-[0.04em] hover:bg-[#7472e2] transition-colors shrink-0"
              >
                View Google Map
              </a>
            </div>
          </div>

          {/* Group companies */}
          <div className="w-full max-w-[1288px] bg-white rounded-[60px] px-6 lg:px-[76px] py-12 lg:py-[76px] flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
              <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">GROUP COMPANIES</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
              <a href="https://www.folio-hd.co.jp/" target="_blank" rel="noreferrer" className="border border-[#efeeff] rounded-lg h-[346px] max-[991px]:h-[188px] flex flex-col items-center justify-center gap-6 hover:bg-white transition-colors group p-4">
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-400x40_95708867-a98f-47c3-85b3-ba75056b3d52.svg"
                  alt="FOLIO Holdings"
                  className="w-[65%] max-w-[280px] h-auto group-hover:w-[75%] transition-all duration-700"
                />
                <span className="text-[#2d2970] text-sm flex items-center gap-2">Visit site <span aria-hidden>↗</span></span>
              </a>
              <a href="https://folio-sec.com/" target="_blank" rel="noreferrer" className="border border-[#efeeff] rounded-lg h-[346px] max-[991px]:h-[188px] flex flex-col items-center justify-center gap-6 hover:bg-white transition-colors group p-4">
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-200x114_a5036b2e-8320-4b76-9ed6-13bd2a05a0f3.svg"
                  alt="FOLIO Securities"
                  className="w-[32%] max-w-[150px] h-auto group-hover:w-[42%] transition-all duration-700"
                />
                <span className="text-[#2d2970] text-sm flex items-center gap-2">Visit site <span aria-hidden>↗</span></span>
              </a>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="w-full max-w-[1288px] bg-white rounded-[60px] px-6 lg:px-[76px] py-12 lg:py-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-lg bg-[#f12d90] shrink-0" />
              <h2 className="text-[#2d2970] text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">CONTACT</h2>
            </div>
            <p className="text-[#1f243a] text-base leading-[2] tracking-[0.04em] text-center max-w-[640px]">
              For inquiries about our solutions, partnerships, or anything else,
              <br className="hidden lg:block" />
              please reach out via our contact form.
            </p>
            <Link href="/en#contact" className="inline-flex items-center gap-3 bg-[#2d2970] text-white rounded-lg px-8 py-4 hover:bg-[#7472e2] transition-colors">
              <span className="text-sm font-bold tracking-[0.04em]">Contact Us</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
