const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
    test('GET /api/health', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect(200);
        
        expect(response.body.success).toBe(true);
    });

    test('POST /api/items', async () => {
        const newItem = {
            nome: 'Teste',
            descricao: 'Item de teste'
        };

        const response = await request(app)
            .post('/api/items')
            .send(newItem)
            .expect(201);
        
        expect(response.body.success).toBe(true);
        expect(response.body.data.nome).toBe(newItem.nome);
    });
});
