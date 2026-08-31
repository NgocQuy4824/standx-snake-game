import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlpacaTech",
  description:
    "AlpacaTechは、金融業界向けの投資・運用・調査・分析・システム連携に係るソリューションを開発するテクノロジー企業です。 最先端のテクノロジーと金融における知見・ノウハウを融合し、お客様の高い基準を満たすソリューションを提供しています。",
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
