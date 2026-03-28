// src/app/[locale]/storages/page.tsx
import { redirect } from "next/navigation";

export default async function StoragesPage({ params }: { params: { locale: "es" | "en" } }) {
  const locale = params?.locale ?? "es";
  redirect(`/${locale}`);
}
