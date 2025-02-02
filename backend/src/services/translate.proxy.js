import axios from 'axios';

const LANGUAGES = [
  'en',    // English
  'hi',    // Hindi
  'bn',    // Bengali
  'te',    // Telugu
  'mr',    // Marathi
  'ta',    // Tamil
  'ur',    // Urdu
  'gu',    // Gujarati
  'kn',    // Kannada
  'or',    // Odia
  'pa',    // Punjabi
  'as',    // Assamese
  'ml',    // Malayalam
  'sa',    // Sanskrit
  'ks',    // Kashmiri
  'ne',    // Nepali
  'sd',    // Sindhi
  'si',    // Sinhala
  'doi',   // Dogri
  'kok',   // Konkani
  'mni',   // Manipuri
  'sat'    // Santali
];

export const translateFAQ = async (faq) => {
  try {
    const translations = new Map();
    
    for (const language of LANGUAGES) {
      if (language === faq.language) continue;
      
      const questionTranslation = await translateText(faq.question, language, faq.language);
      const answerTranslation = await translateText(faq.answer, language, faq.language);
      
      translations.set(language, {
        question: questionTranslation,
        answer: answerTranslation
      });
    }
    
    faq.translations = translations;
    await faq.save();
  } catch (error) {
    console.error('Translation error:', error.message);
    throw error;
  }
};

const translateText = async (text, targetLang, sourceLang = 'en') => {
  try {
    const { data } = await axios.post(
      `${process.env.TRANSLATION_SERVICE_URL}/translate`,
      { text, dest: targetLang, src: sourceLang }
    );
    return data.translation;
  } catch (error) {
    console.error('Translation error:', error.message);
    throw error;
  }
}; 