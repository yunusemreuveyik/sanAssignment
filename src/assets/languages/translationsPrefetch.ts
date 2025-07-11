import i18n from "./i18n";

export const prefetchTranslation = async (fileName: string): Promise<void> => {
  try {
    // `Prefetching translation file: ${fileName}`

    const [namespace, langWithExt] = fileName.split(".");
    const lang = langWithExt.split(".")[0];

    // Skip if already loaded
    if (i18n.hasResourceBundle(lang, namespace)) {
      // `Translation for ${namespace} already loaded`
      return;
    }

    const response = await fetch(`/locales/${lang}/${namespace}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}`);
    }

    const translationData = await response.json();

    i18n.addResourceBundle(lang, namespace, translationData, true, true);
    // `Loaded translations for ${namespace} [${lang}]`

    // ✅ Load namespace
    await i18n.loadNamespaces(namespace);

    // ✅ Set namespace as default if it is the loginPage
    if (namespace === "loginPage") {
      i18n.setDefaultNamespace(namespace);
    }
  } catch (err) {
    console.error(`Error prefetching ${fileName}:`, err);
  }
};
