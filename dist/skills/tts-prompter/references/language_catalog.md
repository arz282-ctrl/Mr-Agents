# TTS Supported Languages

The speech model detects the spoken language from the transcript. Set `language_code` to the BCP-47 code of the main spoken language; for regional variants, use the regional code (for example `en-GB`, `es-MX`, `pt-BR`). The code helps the model choose the locale. It does not translate.

**Support status** comes from the official supported-language table of the speech model behind `generate_speech`:

- `Yes`: the language is on the official list.
- `Not listed`: the language was supported before but is **not** on the current official list. Output may fail or sound poor, so tell the user before relying on it.

| Language | BCP-47 Code | Supported |
| :--- | :--- | :--- |
| Arabic (Egypt) | ar-EG | Yes |
| Bangla (Bangladesh) | bn-BD | Yes |
| Dutch (Netherlands) | nl-NL | Yes |
| English (India) | en-IN | Yes |
| English (United States) | en-US | Yes |
| French (France) | fr-FR | Yes |
| German (Germany) | de-DE | Yes |
| Hindi (India) | hi-IN | Yes |
| Indonesian (Indonesia) | id-ID | Yes |
| Italian (Italy) | it-IT | Yes |
| Japanese (Japan) | ja-JP | Yes |
| Korean (South Korea) | ko-KR | Yes |
| Marathi (India) | mr-IN | Yes |
| Polish (Poland) | pl-PL | Yes |
| Portuguese (Brazil) | pt-BR | Yes |
| Romanian (Romania) | ro-RO | Yes |
| Russian (Russia) | ru-RU | Yes |
| Spanish (Spain) | es-ES | Yes |
| Tamil (India) | ta-IN | Yes |
| Telugu (India) | te-IN | Yes |
| Thai (Thailand) | th-TH | Yes |
| Turkish (Turkey) | tr-TR | Yes |
| Ukrainian (Ukraine) | uk-UA | Not listed |
| Vietnamese (Vietnam) | vi-VN | Yes |
| Afrikaans (South Africa) | af-ZA | Yes |
| Albanian (Albania) | sq-AL | Yes |
| Amharic (Ethiopia) | am-ET | Yes |
| Arabic (World) | ar-001 | Yes |
| Armenian (Armenia) | hy-AM | Yes |
| Azerbaijani (Azerbaijan) | az-AZ | Yes |
| Basque (Spain) | eu-ES | Yes |
| Belarusian (Belarus) | be-BY | Yes |
| Bulgarian (Bulgaria) | bg-BG | Yes |
| Burmese (Myanmar) | my-MM | Yes |
| Catalan (Spain) | ca-ES | Yes |
| Cebuano (Philippines) | ceb-PH | Yes |
| Chinese, Mandarin (China) | cmn-CN | Yes |
| Chinese, Mandarin (Taiwan) | cmn-tw | Yes |
| Croatian (Croatia) | hr-HR | Yes |
| Czech (Czech Republic) | cs-CZ | Yes |
| Danish (Denmark) | da-DK | Yes |
| English (Australia) | en-AU | Yes |
| English (United Kingdom) | en-GB | Yes |
| Estonian (Estonia) | et-EE | Yes |
| Filipino (Philippines) | fil-PH | Yes |
| Finnish (Finland) | fi-FI | Yes |
| French (Canada) | fr-CA | Yes |
| Galician (Spain) | gl-ES | Yes |
| Georgian (Georgia) | ka-GE | Yes |
| Greek (Greece) | el-GR | Yes |
| Gujarati (India) | gu-IN | Yes |
| Haitian Creole (Haiti) | ht-HT | Yes |
| Hebrew (Israel) | he-IL | Yes |
| Hungarian (Hungary) | hu-HU | Yes |
| Icelandic (Iceland) | is-IS | Yes |
| Javanese (Java) | jv-JV | Yes |
| Kannada (India) | kn-IN | Yes |
| Konkani (India) | kok-IN | Not listed |
| Lao (Laos) | lo-LA | Yes |
| Latin (Vatican City) | la-VA | Not listed |
| Latvian (Latvia) | lv-LV | Yes |
| Lithuanian (Lithuania) | lt-LT | Yes |
| Luxembourgish (Luxembourg) | lb-LU | Yes |
| Macedonian (North Macedonia) | mk-MK | Yes |
| Maithili (India) | mai-IN | Yes |
| Malagasy (Madagascar) | mg-MG | Not listed |
| Malay (Malaysia) | ms-MY | Yes |
| Malayalam (India) | ml-IN | Yes |
| Mongolian (Mongolia) | mn-MN | Yes |
| Nepali (Nepal) | ne-NP | Yes |
| Norwegian, Bokmål (Norway) | nb-NO | Yes |
| Norwegian, Nynorsk (Norway) | nn-NO | Yes |
| Odia (India) | or-IN | Yes |
| Pashto (Afghanistan) | ps-AF | Yes |
| Persian (Iran) | fa-IR | Yes |
| Portuguese (Portugal) | pt-PT | Yes |
| Punjabi (India) | pa-IN | Yes |
| Serbian (Serbia) | sr-RS | Yes |
| Sindhi (India) | sd-IN | Yes |
| Sinhala (Sri Lanka) | si-LK | Yes |
| Slovak (Slovakia) | sk-SK | Yes |
| Slovenian (Slovenia) | sl-SI | Yes |
| Spanish (Latin America) | es-419 | Yes |
| Spanish (Mexico) | es-MX | Yes |
| Swahili (Kenya) | sw-KE | Yes |
| Swedish (Sweden) | sv-SE | Yes |
| Urdu (Pakistan) | ur-PK | Not listed |

## Additional supported languages

The official list also includes the languages below. Use the standard BCP-47 code for the language, for example `yue-HK` for Cantonese, `kk-KZ` for Kazakh or `km-KH` for Khmer.

Acehnese (Arabic script), Akan, Assamese, Awadhi, Balinese, Banjar (Arabic script), Banjar (Latin script), Bashkir, Bemba, Bhojpuri, Bosnian, Buginese, Cantonese, Central Kurdish, Chhattisgarhi, Crimean Tatar, Dari (Afghan Persian), Dyula, Dzongkha, Ganda, Guarani, Hausa, Igbo, Iloko, Kabyle, Kamba, Kashmiri (Arabic script), Kashmiri (Devanagari), Kazakh, Khmer, Kikuyu, Kinyarwanda, Kongo, Kyrgyz, Latgalian, Lingala, Magahi, Maltese, Manipuri (Meitei), Minangkabau (Arabic script), Minangkabau (Latin script), Mizo, Nigerian Fulfulde, Northern Sotho, Northern Uzbek, Nyanja, Occitan, Pangasinan, Santali, Somali, South Azerbaijani, Southern Sotho, Standard Arabic (Latin script), Swati, Tajik, Tigrinya, Uyghur.

## Library voice locales

Library voices (SKILL.md §5.2) exist for 30 locales. With a library voice, set `language_code` to exactly that voice's locale; any other code fails with `No matching speaker voice found`. The five library locales below are not in the official language table above, but their own code is still the one to set:

| Library locale | Accents | `language_code` to set |
| :--- | :--- | :--- |
| `en-CA` | Toronto English, Vancouver English | `en-CA` |
| `en-IE` | Dublin English | `en-IE` |
| `en-NZ` | Auckland New Zealand English | `en-NZ` |
| `en-ZA` | Cape Town English | `en-ZA` |
| `jv-ID` | Javanese | `jv-ID` |
