import * as Localization from "expo-localization"
import i18n from "i18n-js"
import it from "./it.json"
import en from "./en.json"
import ja from "./ja.json"

i18n.fallbacks = true
i18n.translations = { it, en, ja }

i18n.locale = Localization.locale || "it"

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof it
// export type TxKeyPath = RecursiveKeyOf<DefaultLocale>
export type TxKeyPath = RecursiveKeyOf<any>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
