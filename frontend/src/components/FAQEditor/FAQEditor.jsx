import React, { useState, useEffect } from 'react';
import { Button, Card, message, Input, Modal, Select } from 'antd';
import axios from 'axios';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import './FAQEditor.css';

// Define the limited language options for translation
const TRANSLATION_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'bn', label: 'Bengali' },
  { value: 'te', label: 'Telugu' },
  { value: 'mr', label: 'Marathi' },
  { value: 'ta', label: 'Tamil' },
  { value: 'ur', label: 'Urdu' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'kn', label: 'Kannada' },
  { value: 'or', label: 'Odia' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'as', label: 'Assamese' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'sa', label: 'Sanskrit' },
  { value: 'ks', label: 'Kashmiri' },
  { value: 'ne', label: 'Nepali' },
  { value: 'sd', label: 'Sindhi' },
  { value: 'si', label: 'Sinhala' },
  { value: 'doi', label: 'Dogri' },
  { value: 'kok', label: 'Konkani' },
  { value: 'mni', label: 'Manipuri' },
  { value: 'sat', label: 'Santali' }
];

const FAQEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [translatedFaqs, setTranslatedFaqs] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    language: 'en'
  });

  const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'or', name: 'Odia' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'as', name: 'Assamese' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'sa', name: 'Sanskrit' },
    { code: 'ks', name: 'Kashmiri' },
    { code: 'ne', name: 'Nepali' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'si', name: 'Sinhala' },
    { code: 'doi', name: 'Dogri' },
    { code: 'kok', name: 'Konkani' },
    { code: 'mni', name: 'Manipuri' },
    { code: 'sat', name: 'Santali' }
  ];

  useEffect(() => {
    fetchFAQs();
  }, [selectedLang]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/faqs?language=${selectedLang}`);
      setFaqs(response.data);
    } catch (err) {
      message.error('Error fetching FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      language: selectedLang
    };
    if (!payload.question || !payload.answer) {
      message.error('Both question and answer are required.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/faqs`, payload);
      message.success('FAQ created successfully!');
      setFaqs(prevFaqs => [response.data, ...prevFaqs]);
      setFormData({ question: '', answer: '', language: selectedLang });
    } catch (error) {
      if (error.response) {
        message.error(`Error: ${error.response.data.message}`);
      } else {
        message.error('Error creating FAQ');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.REACT_APP_API_URL}/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq._id !== id));
      message.success('FAQ deleted successfully!');
    } catch (error) {
      message.error('Error deleting FAQ');
    } finally {
      setLoading(false);
    }
  };

  // When the user clicks "Translate", show a modal that allows them to pick the target language.
  const handleTranslate = (faq) => {
    // Exclude the FAQ's current language from the options so the user only sees the other available languages.
    const availableOptions = TRANSLATION_OPTIONS.filter(opt => opt.value !== faq.language);

    Modal.confirm({
      title: 'Select Target Language',
      icon: null,
      content: (
        <Select
          style={{ width: '100%' }}
          placeholder="Select language"
          options={availableOptions}
          onChange={(value) => {
            performTranslation(faq, value);
            Modal.destroyAll(); // Close the modal immediately after selection
          }}
        />
      ),
      okButtonProps: { style: { display: 'none' } },
      cancelButtonText: 'Cancel'
    });
  };

  // Function that calls the translation service and then updates the FAQ in the database.
  const performTranslation = async (faq, targetLang) => {
    try {
      setLoading(true);
      const translationUrl = process.env.REACT_APP_TRANSLATION_URL || 'http://localhost:8000';

      // Translate question
      const respQuestion = await axios.post(`${translationUrl}/translate`, {
        text: faq.question,
        dest: targetLang,
        src: faq.language
      });
      // Translate answer
      const respAnswer = await axios.post(`${translationUrl}/translate`, {
        text: faq.answer,
        dest: targetLang,
        src: faq.language
      });

      // Update local state to show translated FAQ if needed.
      setTranslatedFaqs(prev => ({
        ...prev,
        [faq._id]: {
          ...prev[faq._id],
          [targetLang]: {
            question: respQuestion.data.translation,
            answer: respAnswer.data.translation
          }
        }
      }));

      // Merge any existing translations with the new one.
      const existingTranslations = faq.translations || {};
      const updatedTranslations = {
        ...existingTranslations,
        [targetLang]: {
          question: respQuestion.data.translation,
          answer: respAnswer.data.translation
        }
      };

      // Prepare payload to update the FAQ. Keep original question, answer, language, and update translations.
      const updatedFaqPayload = {
        question: faq.question,
        answer: faq.answer,
        language: faq.language,
        translations: updatedTranslations
      };

      // Call the update API to push the updated translations to the database.
      const updateResponse = await axios.put(`${process.env.REACT_APP_API_URL}/faqs/${faq._id}`, updatedFaqPayload);

      // Update local FAQ state by replacing the item with the updated FAQ from the DB.
      setFaqs(prevFaqs => prevFaqs.map(f => f._id === faq._id ? updateResponse.data : f));
      message.success(`Translation for ${targetLang.toUpperCase()} saved to DB.`);
    } catch (error) {
      message.error('Error translating FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Add this new handler function
  const handleSaveTranslation = async (originalFaq, translation) => {
    try {
      // Get the first (and only) language key from translations
      const [targetLang] = Object.keys(translation).filter(k => k !== '_id'); 
      
      // Validate against known languages
      if (!LANGUAGES.some(l => l.code === targetLang)) {
        throw new Error('Invalid target language');
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/faqs`, {
        question: translation[targetLang].question,
        answer: translation[targetLang].answer,
        language: targetLang
      });
      message.success('Translated FAQ saved successfully!');
      setFaqs(prev => [response.data, ...prev]);
    } catch (error) {
      message.error('Error saving translated FAQ');
    }
  };

  return (
    <div className="container">
      <Card
        title="FAQ Manager"
        extra={<LanguageSelector value={selectedLang} onChange={setSelectedLang} style={{ width: 120 }} />}
      >
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="input-field"
            style={{ marginBottom: 16 }}
          />
          <Input.TextArea
            placeholder="Enter answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="input-field"
            rows={4}
            style={{ marginBottom: 16 }}
          />
          <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
        </form>

        <div className="faq-list" style={{ marginTop: 24 }}>
          {faqs.map(faq => (
            <Card key={faq._id} style={{ marginTop: 16 }}>
              <div className="card-header">
                <h3>{translatedFaqs[faq._id]?.question || faq.question}</h3>
                <div className="language-tag">{faq.language.toUpperCase()}</div>
              </div>
              <div className="answer-content">
                {translatedFaqs[faq._id] && (
                  <div className="translation-actions">
                    <Button 
                      type="primary" 
                      size="small"
                      onClick={() => handleSaveTranslation(faq, translatedFaqs[faq._id])}
                    >
                      Save as New FAQ
                    </Button>
                    <span className="translation-language">
                      ({Object.keys(translatedFaqs[faq._id]).find(k => k !== '_id')})
                    </span>
                  </div>
                )}
                {translatedFaqs[faq._id]?.answer || faq.answer}
              </div>
              <div style={{ marginTop: 8 }}>
                <Button type="link" onClick={() => handleTranslate(faq)}>
                  Translate
                </Button>
                <Button type="link" danger onClick={() => handleDelete(faq._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default FAQEditor;
