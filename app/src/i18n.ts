import i18n, { type i18n as I18n, type ThirdPartyModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './translations/de.json';
import en from './translations/en.json';
import { z } from 'zod';

const zodModule: ThirdPartyModule = {
	type: '3rdParty',
	init(i18next: I18n): void {
		i18next.on('languageChanged', lang => {
			if (lang == 'de') {
				z.config(z.locales.de())
			}
			if (lang == 'en') {
				z.config(z.locales.en());
			}
		})
	},
};

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en,
	de,
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(zodModule)
	.init({
		resources,
		debug: true,
		lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},

	});

export default i18n;
