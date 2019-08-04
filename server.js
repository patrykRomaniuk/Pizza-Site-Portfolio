const express = require('express');
const app = express();
const connectDatabase = require('./config/db');

connectDatabase();

app.use(express.json());

app.use('/api/pizzaItem',require('./routes/pizzaItem'));
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));