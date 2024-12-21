const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Temporary in-memory storage for portfolio items
let portfolioItems = [];

// GET - List all portfolio items
app.get('/api/portfolio', (req, res) => {
    res.json(portfolioItems);
});

// POST - Add a new portfolio item
app.post('/api/portfolio', (req, res) => {
    const newItem = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    };
    portfolioItems.push(newItem);
    res.status(201).json(newItem);
});

// PUT - Edit a portfolio item
app.put('/api/portfolio/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = portfolioItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        portfolioItems[itemIndex] = { ...portfolioItems[itemIndex], ...req.body };
        res.json(portfolioItems[itemIndex]);
    } else {
        res.status(404).send('Item not found');
    }
});

// DELETE - Remove a portfolio item
app.delete('/api/portfolio/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    portfolioItems = portfolioItems.filter(item => item.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
