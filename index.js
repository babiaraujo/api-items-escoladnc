const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados em memória
let items = [];
let currentId = 1;

// Rota para criar um novo item (Create)
app.post('/items', (req, res) => {
  const newItem = {
    id: currentId++,
    name: req.body.name,
    description: req.body.description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Rota para listar todos os itens (Read)
app.get('/items', (req, res) => {
  res.json(items);
});

// Rota para obter um item específico (Read)
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Rota para atualizar um item (Update)
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  item.name = req.body.name || item.name;
  item.description = req.body.description || item.description;
  res.json(item);
});

// Rota para deletar um item (Delete)
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
