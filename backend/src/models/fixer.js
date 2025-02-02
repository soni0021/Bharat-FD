import FAQ from '../models/faq.model.js';

const updateDocuments = async () => {
  try {
    await FAQ.updateMany(
      { translations: { $exists: false } }, // Find documents without translations
      { $set: { translations: new Map() } } // Add an empty Map as default value
    );
    console.log('Documents updated successfully');
  } catch (error) {
    console.error('Error updating documents:', error.message);
  }
};

updateDocuments();
