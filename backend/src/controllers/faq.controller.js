import FAQ from '../models/faq.model.js';
import { getCache, setCache } from '../utils/cache.js';
import { translateFAQ } from '../services/translate.proxy.js';

export const getFAQs = async (req, res) => {
  try {
    // Optionally filter by language, or return all FAQs
    const language = req.query.language || 'en';
    const faqs = await FAQ.find({ language });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer, language = 'en' } = req.body;
    const newFAQ = new FAQ({ question, answer, language });
    
    if (req.body.autoTranslate) {
      await translateFAQ(newFAQ);
    }
    
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    // Update the basic fields
    faq.question = req.body.question;
    faq.answer = req.body.answer;
    faq.language = req.body.language;
    
    // Update translations if present. 
    // (Mongoose will cast a plain object to a Map if defined in the schema.)
    if (req.body.translations) {
      faq.translations = req.body.translations;
    }
    
    // Save updates to the database
    await faq.save();
    res.status(200).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};