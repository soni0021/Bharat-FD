// models/faq.model.js
import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  language: { type: String, default: 'en' },
  translations: {
    type: Map,
    of: translationSchema,
    default: new Map()
  }
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;  // Correct ES Modules export
