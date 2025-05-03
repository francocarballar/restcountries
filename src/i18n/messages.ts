import type { Messages, LanguageCode } from '@/types/message'

/**
 * @constant messages
 * @description Constant for the messages.
 * @type {Record<LanguageCode, Messages>}
 * @returns {Record<LanguageCode, Messages>} A record of messages for each language.
 */
export const messages: Record<LanguageCode, Messages> = {
  en: {
    // English
    welcome: 'Welcome to the API',
    countryNotFound: "Country with name '{param}' not found",
    regionNotFound: "Region with name '{param}' not found",
    internalServerError: 'An internal server error occurred.'
  },
  es: {
    // Spanish
    welcome: 'Bienvenido a la API',
    countryNotFound: "País con nombre '{param}' no encontrado",
    regionNotFound: "Región con nombre '{param}' no encontrada",
    internalServerError: 'Ocurrió un error interno en el servidor.'
  },
  zh: {
    // Chinese (Mandarin Simplified)
    welcome: '欢迎使用 API',
    countryNotFound: "未找到名为'{param}'的国家",
    regionNotFound: "未找到名为'{param}'的区域",
    internalServerError: 'An internal server error occurred.'
  },
  hi: {
    // Hindi
    welcome: 'एपीआई में आपका स्वागत है',
    countryNotFound: "'{param}' नाम वाला देश नहीं मिला",
    regionNotFound: "'{param}' नाम वाला क्षेत्र नहीं मिला",
    internalServerError: 'An internal server error occurred.'
  },
  pt: {
    // Portuguese
    welcome: 'Bem-vindo à API',
    countryNotFound: "País com nome '{param}' não encontrado",
    regionNotFound: "Região com nome '{param}' não encontrada",
    internalServerError: 'An internal server error occurred.'
  },
  bn: {
    // Bengali
    welcome: 'এপিআই-এ স্বাগতম',
    countryNotFound: "'{param}' নামের দেশ খুঁজে পাওয়া যায়নি",
    regionNotFound: "'{param}' নামের অঞ্চল খুঁজে পাওয়া যায়নি",
    internalServerError: 'An internal server error occurred.'
  },
  ru: {
    // Russian
    welcome: 'Добро пожаловать в API',
    countryNotFound: "Страна с названием '{param}' не найдена",
    regionNotFound: "Регион с названием '{param}' не найден",
    internalServerError: 'An internal server error occurred.'
  },
  ja: {
    // Japanese
    welcome: 'APIへようこそ',
    countryNotFound: "'{param}' という名前の国は見つかりませんでした",
    regionNotFound: "'{param}' という名前の地域は見つかりませんでした",
    internalServerError: 'An internal server error occurred.'
  },
  pa: {
    // Punjabi (Gurmukhi script as common)
    welcome: 'API ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    countryNotFound: "'{param}' ਨਾਮ ਵਾਲਾ ਦੇਸ਼ ਨਹੀਂ ਮਿਲਿਆ",
    regionNotFound: "'{param}' ਨਾਮ ਵਾਲਾ ਖੇਤਰ ਨਹੀਂ ਮਿਲਿਆ",
    internalServerError: 'An internal server error occurred.'
  },
  vi: {
    // Vietnamese
    welcome: 'Chào mừng đến với API',
    countryNotFound: "Không tìm thấy quốc gia có tên '{param}'",
    regionNotFound: "Không tìm thấy khu vực có tên '{param}'",
    internalServerError: 'An internal server error occurred.'
  },
  tr: {
    // Turkish
    welcome: "API'ya hoş geldiniz",
    countryNotFound: "'{param}' adlı ülke bulunamadı",
    regionNotFound: "'{param}' adlı bölge bulunamadı",
    internalServerError: 'An internal server error occurred.'
  },
  ar: {
    // Arabic (Modern Standard)
    welcome: 'أهلاً بك في واجهة برمجة التطبيقات',
    countryNotFound: "لم يتم العثور على بلد بالاسم '{param}'",
    regionNotFound: "لم يتم العثور على منطقة بالاسم '{param}'",
    internalServerError: 'An internal server error occurred.'
  },
  mr: {
    // Marathi
    welcome: 'API मध्ये आपले स्वागत आहे',
    countryNotFound: "'{param}' नावाचा देश सापडला नाही",
    regionNotFound: "'{param}' नावाचा प्रदेश सापडला नाही",
    internalServerError: 'An internal server error occurred.'
  },
  te: {
    // Telugu
    welcome: 'APIకి స్వాగతం',
    countryNotFound: "'{param}' పేరుతో దేశం కనుగొనబడలేదు",
    regionNotFound: "'{param}' పేరుతో ప్రాంతం కనుగొనబడలేదు",
    internalServerError: 'An internal server error occurred.'
  },
  ko: {
    // Korean
    welcome: 'API에 오신 것을 환영합니다',
    countryNotFound: "'{param}' 이름을 가진 국가를 찾을 수 없습니다",
    regionNotFound: "'{param}' 이름을 가진 지역을 찾을 수 없습니다",
    internalServerError: 'An internal server error occurred.'
  },
  ta: {
    // Tamil
    welcome: 'APIக்கு வரவேற்கிறோம்',
    countryNotFound: "'{param}' என்ற பெயரில் நாடு கண்டறியப்படவில்லை",
    regionNotFound: "'{param}' என்ற பெயரில் பகுதி கண்டறியப்படவில்லை",
    internalServerError: 'An internal server error occurred.'
  },
  ur: {
    // Urdu
    welcome: 'API میں خوش آمدید',
    countryNotFound: "'{param}' نام والا ملک نہیں ملا",
    regionNotFound: "'{param}' نام والا علاقہ نہیں ملا",
    internalServerError: 'An internal server error occurred.'
  },
  de: {
    // German
    welcome: 'Willkommen bei der API',
    countryNotFound: "Land mit Namen '{param}' nicht gefunden",
    regionNotFound: "Region mit Namen '{param}' nicht gefunden",
    internalServerError: 'An internal server error occurred.'
  },
  id: {
    // Indonesian
    welcome: 'Selamat datang di API',
    countryNotFound: "Negara dengan nama '{param}' tidak ditemukan",
    regionNotFound: "Wilayah dengan nama '{param}' tidak ditemukan",
    internalServerError: 'An internal server error occurred.'
  },
  fr: {
    // French
    welcome: "Bienvenue sur l'API",
    countryNotFound: "Pays avec le nom '{param}' non trouvé",
    regionNotFound: "Région avec le nom '{param}' non trouvée",
    internalServerError: 'An internal server error occurred.'
  },
  jv: {
    // Javanese
    welcome: 'Sugeng rawuh ing API',
    countryNotFound: "Negara kanthi jeneng '{param}' ora ditemokake",
    regionNotFound: "Wilayah kanthi jeneng '{param}' ora ditemokake",
    internalServerError: 'An internal server error occurred.'
  },
  fa: {
    // Persian (Farsi)
    welcome: 'به API خوش آمدید',
    countryNotFound: "کشوری با نام '{param}' یافت نشد",
    regionNotFound: "منطقه ای با نام '{param}' یافت نشد",
    internalServerError: 'An internal server error occurred.'
  },
  it: {
    // Italian
    welcome: "Benvenuto nell'API",
    countryNotFound: "Paese con nome '{param}' non trovato",
    regionNotFound: "Regione con nome '{param}' non trovata",
    internalServerError: 'An internal server error occurred.'
  },
  ha: {
    // Hausa
    welcome: 'Barka da zuwa API',
    countryNotFound: "Ba a sami ƙasar mai suna '{param}' ba",
    regionNotFound: "Ba a sami yankin mai suna '{param}' ba",
    internalServerError: 'An internal server error occurred.'
  },
  gu: {
    // Gujarati
    welcome: 'API માં આપનું સ્વાગત છે',
    countryNotFound: "'{param}' નામનો દેશ મળ્યો નથી",
    regionNotFound: "'{param}' નામનો પ્રદેશ મળ્યો નથી",
    internalServerError: 'An internal server error occurred.'
  },
  bho: {
    // Bhojpuri
    welcome: 'API में स्वागत बा',
    countryNotFound: "'{param}' नाम के देश ना मिलल",
    regionNotFound: "'{param}' नाम के क्षेत्र ना मिलल",
    internalServerError: 'An internal server error occurred.'
  },
  th: {
    // Thai
    welcome: 'ยินดีต้อนรับสู่ API',
    countryNotFound: "ไม่พบประเทศชื่อ '{param}'",
    regionNotFound: "ไม่พบภูมิภาคชื่อ '{param}'",
    internalServerError: 'An internal server error occurred.'
  },
  nl: {
    // Dutch
    welcome: 'Welkom bij de API',
    countryNotFound: "Land met naam '{param}' niet gevonden",
    regionNotFound: "Regio met naam '{param}' niet gevonden",
    internalServerError: 'An internal server error occurred.'
  },
  yo: {
    // Yoruba
    welcome: 'Kaabọ si API',
    countryNotFound: "Orílẹ̀-èdè tí orúkọ rẹ̀ ń jẹ́ '{param}' kò sí",
    regionNotFound: "Agbègbè tí orúkọ rẹ̀ ń jẹ́ '{param}' kò sí",
    internalServerError: 'An internal server error occurred.'
  },
  uk: {
    // Ukrainian
    welcome: 'Ласкаво просимо до API',
    countryNotFound: "Країну з назвою '{param}' не знайдено",
    regionNotFound: "Регіон з назвою '{param}' не знайдено",
    internalServerError: 'An internal server error occurred.'
  }
}

/**
 * @constant defaultLanguage
 * @description Constant for the default language.
 * @type {LanguageCode}
 * @returns {LanguageCode} The default language.
 */
export const defaultLanguage: LanguageCode = 'en'
