import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (args: any) => {
    // In different next-intl versions, the locale might be in different properties
    const locale = args.locale || (await args.requestLocale);
    const activeLocale = locale || 'fr';

    return {
        locale: activeLocale,
        messages: (await import(`@/messages/${activeLocale}.json`)).default
    };
});
