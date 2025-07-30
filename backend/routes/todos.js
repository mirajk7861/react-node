const express = require('express');
const router = express.Router();

// In-memory todo list
let todos = [];

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST a new todo
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const newTodo = { id: Date.now().toString(), text }; // Ensure id is a string
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


// PUT (update) a todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let found = false;

  todos = todos.map(todo => {
    if (todo.id == id) {
      found = true;
      return { ...todo, text };
    }
    return todo;
  });

  if (!found) return res.status(404).json({ error: 'Todo not found' });
  res.json({ message: 'Todo updated' });
});

// DELETE a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const originalLength = todos.length;
  todos = todos.filter(todo => todo.id != id);

  if (todos.length === originalLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json({ message: 'Todo deleted' });
});

module.exports = router;
