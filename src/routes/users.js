const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' }
];

//Routes for users

// GET /users

router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send('User not found.');
        return;
    }
    res.json(user);
});

// POST /users

router.post('/', (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
  
    const newUser = {
      id: users.length + 1,
      name,
    };
  
    users.push(newUser);
  
    res.status(201).json(newUser);
  });

// PUT /users/:id
router.put('/:id', (req, res) => {  
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send('User not found.');
        return;
    }
    user.name = req.body.name;
    res.json(user);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send('User not found.');
        return;
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json(user);
});

module.exports = router;
