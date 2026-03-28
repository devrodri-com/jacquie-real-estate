// src/app/[locale]/precon/page.tsx
import { redirect } from "next/navigation";

export default async function PreconPage({ params }: { params: { locale: "es" | "en" } }) {
  const locale = params?.locale ?? "es";
  redirect(`/${locale}/proyectos`);
}
