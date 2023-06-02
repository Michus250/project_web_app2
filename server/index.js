require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const auth = require('./routes/auth');





mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true});
    
const db = mongoose.connection
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to Database"));

app.use(express.json());
app.use(userRoutes);
app.use(auth);



app.listen(5000, () =>console.log('Server started'));

