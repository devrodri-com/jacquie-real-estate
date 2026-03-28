// src/i18n.ts
export async function loadMessages(locale: 'es'|'en'|'fr') {
    const dict = await import(`./messages/${locale}.json`);
    return dict.default;
  }