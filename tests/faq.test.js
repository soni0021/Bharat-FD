const mongoose = require('mongoose');
const expect = require('chai').expect;
const FAQ = require('../models/faq');

describe('FAQ Model', () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    mongoose.connection.once('open', () => done());
  });

  it('should create a new FAQ', async () => {
    const faq = new FAQ({
      question: 'What is Express?',
      answer: 'Express is a minimal and flexible Node.js web application framework.'
    });
    const newFAQ = await faq.save();
    expect(newFAQ.question).to.equal('What is Express?');
  });
}); 