import express from 'express';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faq.controller.js';

const router = express.Router();

// Middleware to validate FAQ input
const validateFAQ = (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Both question and answer are required.' });
  }
  next();
};

// FAQ Routes
// GET /api/faqs          - List all FAQs (optionally filtered by query parameters)
// POST /api/faqs         - Create a new FAQ (with optional auto-translation)
// PUT /api/faqs/:id      - Update an existing FAQ
// DELETE /api/faqs/:id   - Delete an FAQ
router.get('/', getFAQs);
router.post('/', validateFAQ, createFAQ);
router.put('/:id', validateFAQ, updateFAQ);
router.delete('/:id', deleteFAQ);

export default router;
