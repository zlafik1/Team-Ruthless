const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Временное хранилище в памяти (замените на базу данных)
let applications = [];

app.use(cors());
app.use(bodyParser.json());

// Получить все заявки
app.get('/api/applications', (req, res) => {
    res.json(applications);
});

// Добавить новую заявку
app.post('/api/applications', (req, res) => {
    const application = {
        id: Date.now(),
        ...req.body,
        date: new Date().toLocaleString('ru-RU'),
        status: 'pending'
    };
    
    applications.push(application);
    res.json({ success: true, message: 'Заявка сохранена' });
});

// Обновить статус заявки
app.put('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const index = applications.findIndex(app => app.id == id);
    if (index !== -1) {
        applications[index].status = status;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Заявка не найдена' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
