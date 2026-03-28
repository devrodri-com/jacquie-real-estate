// src/app/[locale]/miami/page.tsx
import { redirect } from "next/navigation";

export default async function MiamiPage({ params }: { params: { locale: "es" | "en" } }) {
  const locale = params?.locale ?? "es";
  redirect(`/${locale}`);
}
