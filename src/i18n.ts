// src/i18n.ts
export async function loadMessages(locale: 'es'|'en') {
    const dict = await import(`./messages/${locale}.json`);
    return dict.default;
  }