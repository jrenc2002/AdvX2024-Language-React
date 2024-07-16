// src/react-i18next.d.ts
import 'react-i18next'

declare module 'react-i18next' {
  interface Resources {
    translation: typeof import('@/locales/en/translation.json')
  }
}
interface HTMLWebViewElement extends HTMLElement {
  loadURL(url: string): void
}
