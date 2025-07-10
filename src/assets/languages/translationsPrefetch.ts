import i18n from "./i18n";

export const prefetchTranslation = async (fileName: string): Promise<void> => {
  try {
    console.log(`Prefetching translation file: ${fileName}`);

    const [namespace, langWithExt] = fileName.split(".");
    const lang = langWithExt.split(".")[0]; // e.g. "en"

    // Skip if already loaded
    if (i18n.hasResourceBundle(lang, namespace)) {
      console.log(`Translation for ${namespace} already loaded`);
      return;
    }

    const response = await fetch(`/locales/${lang}/${namespace}.json`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}`);
    }

    const translationData = await response.json();

    i18n.addResourceBundle(lang, namespace, translationData, true, true);
    console.log(`Loaded translations for ${namespace} [${lang}]`);

    // ✅ Force reload namespaces if needed
    await i18n.loadNamespaces(namespace);
  } catch (err) {
    console.error(`Error prefetching ${fileName}:`, err);
  }
};
