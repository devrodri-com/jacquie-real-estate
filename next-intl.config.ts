// Usamos los JSON en /src/i18n/messages
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const l = locale === 'en' ? 'en' : 'es';

  let messages: Record<string, unknown>;
  if (l === 'en') {
    messages = (await import('./src/i18n/messages/en.json')).default;
  } else {
    messages = (await import('./src/i18n/messages/es.json')).default;
  }

  return {messages, locale: l};
});