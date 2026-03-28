// Usamos los JSON en /src/i18n/messages
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const l = locale === 'en' ? 'en' : locale === 'fr' ? 'fr' : 'es';

  let messages: Record<string, unknown>;
  if (l === 'en') {
    messages = (await import('./src/i18n/messages/en.json')).default;
  } else if (l === 'fr') {
    messages = (await import('./src/i18n/messages/fr.json')).default;
  } else {
    messages = (await import('./src/i18n/messages/es.json')).default;
  }

  return {messages, locale: l};
});