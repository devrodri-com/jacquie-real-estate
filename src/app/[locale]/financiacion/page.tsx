// src/app/[locale]/financiacion/page.tsx
import { redirect } from "next/navigation";

export default async function FinancingPage({ params }: { params: { locale: "es" | "en" } }) {
  const locale = params?.locale ?? "es";
  redirect(`/${locale}/contacto`);
}
