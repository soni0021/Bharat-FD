import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from './faq.model.js';

dotenv.config();

const uri = process.env.MONGODB_URI ;
// This function could be expanded to generate translations if needed.
// For now, it returns an empty object.
async function generateTranslations(question, answer) {
  const translations = new Map();
  for (const language of LANGUAGES) {
    if (language === 'en') continue; // Skip English since it's the default
    translations.set(language, {
      question: question,
      answer: answer
    });
  }
  return translations;
}

const faqData = [
  {
    question: "Why should I use a digital platform for fixed deposits instead of going to a bank?",
    answer: "Digital platforms often offer higher interest rates, are more convenient for comparing different options, and have faster processing times. You can manage multiple fixed deposits from different banks in one place without having to visit each bank physically.",
    language: "en"
  },
  {
    question: "How can I be sure that my money is safe with your platform?",
    answer: "Our platform works with banks that are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC) for amounts up to ₹5 lakh. We also carefully check the financial stability of our partners.",
    language: "en"
  },
  {
    question: "Who can open a Fixed Deposit?",
    answer: "Any Indian citizen who is 18 years old or older and has valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit.",
    language: "en"
  },
  {
    question: "What documents do I need to open an FD?",
    answer: "You need to provide: PAN card, Aadhaar card, and bank account details for transferring funds.",
    language: "en"
  },
  {
    question: "Is there a minimum or maximum amount required to open an FD?",
    answer: "The minimum amount is usually ₹1,000, while the maximum amount can vary by institution, often up to ₹1 crore or more.",
    language: "en"
  },
  {
    question: "Can I renew my Fixed Deposit upon maturity?",
    answer: "Yes, most banks offer options to automatically renew your FD for the same tenure upon maturity, unless you choose otherwise.",
    language: "en"
  },
  {
    question: "Should I be worried about falling interest rates in the future?",
    answer: "While it's always good to be aware of market trends, locking in current high rates can be beneficial if forecasts suggest rates might go down. Consider spreading your investments across different tenures to reduce risks associated with rate changes.",
    language: "en"
  },
  {
    question: "How do current economic conditions affect fixed deposit rates?",
    answer: "Economic factors such as inflation rates and decisions by the Reserve Bank of India (RBI) can influence FD rates. In times of rising inflation or economic uncertainty, banks may adjust rates to attract more deposits.",
    language: "en"
  },
  {
    question: "Can I change my FD tenure after opening an account?",
    answer: "No, once you open an FD, the tenure cannot be changed. However, you can choose to close it early if needed.",
    language: "en"
  },
  {
    question: "What happens if the bank I invest in faces financial difficulties?",
    answer: "If a partnered bank faces financial issues, your deposits are protected up to ₹5 lakh by DICGC insurance. We also keep a close watch on the financial health of our partner institutions.",
    language: "en"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear any existing FAQ data
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQ data');

    // Insert unique FAQ items
    for (const faq of faqData) {
      const translations = await generateTranslations(faq.question, faq.answer);
      const newFAQ = new FAQ({
        ...faq,
        translations
      });
      await newFAQ.save();
    }

    console.log(`Inserted ${faqData.length} unique FAQ items`);
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

seedDatabase();
