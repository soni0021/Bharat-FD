import React from 'react';
import { Select } from 'antd';

const LANGUAGES = [
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

const LanguageSelector = ({ value, onChange, style }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={style}
      options={LANGUAGES}
    />
  );
};

export default LanguageSelector; 