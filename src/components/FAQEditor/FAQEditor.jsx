import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, message } from 'antd';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const FAQEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, [selectedLang]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/faqs?language=${selectedLang}`);
      setFaqs(response.data);
    } catch (error) {
      message.error('Error fetching FAQs');
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

  return (
    <div className="container">
      <Card 
        title="FAQ Manager" 
        extra={<LanguageSelector value={selectedLang} onChange={setSelectedLang} style={{ width: 120 }} />}
      >
        // ... existing form code ...
        
        <div className="faq-list">
          {faqs.map(faq => (
            <Card key={faq._id} style={{ marginTop: 16 }}>
              <div className="card-header">
                <h3>{faq.question}</h3>
                <div className="language-tag">{faq.language.toUpperCase()}</div>
              </div>
              <div className="answer-content" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              <Button 
                type="link" 
                danger 
                onClick={() => handleDelete(faq._id)}
                style={{ marginTop: 8 }}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FAQEditor;