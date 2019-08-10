const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/db');

connectDatabase();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));