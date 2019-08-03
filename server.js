const express = require('express');
const app = express();
const connectDatabase = require('./config/db');

connectDatabase();

app.use(express.json());

app.use('/api/pizzaItem',require('./routes/pizzaItem'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));