const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

// Rota para criar um novo item (Create)
app.post('/items', async (req, res) => {
  try {
    const [id] = await db('items').insert({
      name: req.body.name,
      description: req.body.description
    });
    const newItem = await db('items').where({ id }).first();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar todos os itens (Read)
app.get('/items', async (req, res) => {
  try {
    const items = await db('items').select();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter um item específico (Read)
app.get('/items/:id', async (req, res) => {
  try {
    const item = await db('items').where({ id: req.params.id }).first();
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um item (Update)
app.put('/items/:id', async (req, res) => {
  try {
    const updatedRows = await db('items').where({ id: req.params.id }).update({
      name: req.body.name,
      description: req.body.description
    });
    if (!updatedRows) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = await db('items').where({ id: req.params.id }).first();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});

// Rota para deletar um item (Delete)
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedRows = await db('items').where({ id: req.params.id }).del();
    if (!deletedRows) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
