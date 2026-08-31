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

export default function RecruitPage() {
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
            RECRUIT
          </h1>
          <div className="flex justify-end">
            <Breadcrumb current="RECRUIT" />
          </div>
        </div>
      </section>

      {/* White card */}
      <div className="flex justify-center bg-[#2d2970] px-0">
        <div className="bg-white rounded-t-[60px] max-[991px]:rounded-t-[40px] w-full flex justify-center px-5 lg:px-[76px] py-20">
          <div className="w-full max-w-[1288px] flex flex-col gap-12">
            {/* Hero image */}
            <img
              src="https://storage.googleapis.com/studio-design-asset-files/projects/4yqBl2mdWj/s-1289x473_v-fms_webp_d751e825-390f-47ac-ae9e-7fcc038798ce.jpg"
              alt="AlpacaTech team"
              className="w-full h-auto rounded-2xl object-cover"
            />

            <p className="text-[#1f243a] text-base leading-[2] tracking-[0.04em] font-[var(--font-noto-sans-jp)]">
              AlpacaTech values five principles: &ldquo;Strive for Excellence in Quality&rdquo;, &ldquo;Think and Act Bold&rdquo;, &ldquo;Stronger Together&rdquo;, &ldquo;Integrity and Trust&rdquo; and &ldquo;Embrace Change&rdquo;.
              <br />
              We look forward to working with future colleagues who share these principles and can help us provide new value that goes Beyond Limits In Finance.
            </p>

            {/* Career opportunities */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#f12d90] shrink-0" />
                <h2 className="text-[#2d2970] text-[28px] lg:text-[34px] font-bold tracking-[0.04em] font-[var(--font-noto-sans-jp)]">CAREER OPPORTUNITIES</h2>
              </div>

              <p className="text-[#1f243a] text-base leading-[2] tracking-[0.04em] font-[var(--font-noto-sans-jp)]">
                Complete list of our current job openings can be viewed from the link below.
                <br />
                We look forward to applications from individuals who share AlpacaTech&apos;s vision and enthusiasm for our services.
              </p>

              <Link
                href="https://www.alpaca-tech.ai/en/recruit"
                target="_blank"
                className="inline-flex items-center justify-between gap-3 bg-[#2d2970] text-white rounded-lg px-6 py-[17px] w-full lg:w-[280px] hover:bg-[#7472e2] transition-colors"
              >
                <span className="text-base font-bold tracking-[0.04em]">View Our Open Positions</span>
                <img
                  src="https://storage.googleapis.com/studio-design-asset-files/projects/nBW2yYm1av/s-96x96_webp_d036ae1d-3000-4afc-9403-6e669407edd6.png"
                  alt=""
                  className="w-6 h-6 invert"
                />
              </Link>

              {/* Job list placeholder — mirrors STUDIO list styling */}
              <div className="flex flex-col border-t border-[#efeeff] mt-4">
                {[
                  { title: "Data Engineer — Snowflake / dbt", location: "Tokyo / Remote", type: "Full-time" },
                  { title: "AI Engineer — LLMs & Data Agents", location: "Tokyo / Remote", type: "Full-time" },
                  { title: "Quant Researcher — AIM Models", location: "Tokyo", type: "Full-time" },
                  { title: "Product Manager — Financial Data Platform", location: "Tokyo", type: "Full-time" },
                ].map((job) => (
                  <a
                    key={job.title}
                    href="https://www.alpaca-tech.ai/en/recruit"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-6 py-6 border-b border-[#efeeff] group"
                  >
                    <span className="text-[#2d2970] text-base font-bold group-hover:underline underline-offset-4">{job.title}</span>
                    <span className="text-[#8988a3] text-sm tracking-[0.04em] shrink-0">
                      {job.location} · {job.type}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
