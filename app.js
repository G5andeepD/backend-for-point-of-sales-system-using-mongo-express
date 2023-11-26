const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

const usersRouter = require('./src/routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
