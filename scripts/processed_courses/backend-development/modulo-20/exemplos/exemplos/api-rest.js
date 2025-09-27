const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.get('/api/1.1-teoria-e-fundamentos', (req, res) => {
    res.json({
        success: true,
        message: 'Lista de 1.1-teoria-e-fundamentos',
        data: []
    });
});

app.post('/api/1.1-teoria-e-fundamentos', (req, res) => {
    const { body } = req;
    res.status(201).json({
        success: true,
        message: '1.1-teoria-e-fundamentos criado com sucesso',
        data: body
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
