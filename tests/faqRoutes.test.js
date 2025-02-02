const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('FAQ API Endpoints', () => {
  it('should get a list of FAQs', async () => {
    const response = await request(app).get('/faqs?lang=en');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    // Optionally: test properties of the returned FAQs
    if (response.body.length) {
      expect(response.body[0]).to.have.property('question');
      expect(response.body[0]).to.have.property('answer');
    }
  });

  // Additional endpoint tests can be added here. For instance, testing the POST endpoint:
  it('should create a new FAQ', async () => {
    const newFAQ = {
      question: 'How do I test an endpoint?',
      answer: 'By using Supertest to simulate HTTP requests.'
    };
    
    const response = await request(app)
      .post('/faqs')
      .send(newFAQ)
      .set('Accept', 'application/json');
      
    expect(response.status).to.equal(201);
    expect(response.body).to.include.keys('_id', 'question', 'answer');
    expect(response.body.question).to.equal(newFAQ.question);
  });
}); 