const request = require('supertest');
const app = require('../app');

describe('http://localhost:5000/services', () => {
    it('should create a new service', async () => {
        const res = await request(app)
            .post('/services')
            .send({
                name: 'General Checkup',
                description: 'Basic health checkup',
                price: 50
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'General Checkup');
    });
});
