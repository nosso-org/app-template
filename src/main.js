import App from './App.svelte'

import i18next from 'i18next'
import Fetch from 'i18next-fetch-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
    .use(Fetch)
    .use(LanguageDetector)
    .init({
        debug: true,
        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['querystring', 'navigator', 'localStorage'],
        },
        fallbackLng: false,
        preload: ['pt-BR'],
    })

const app = new App({
    target: document.body,
})

export default app
