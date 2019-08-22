const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/db');

connectDatabase();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));