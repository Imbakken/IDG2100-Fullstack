const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 5000;

const brewRoutes = require("./routes/brewRoutes");
const beanRoutes = require("./routes/beanRoutes");
const rateRoutes = require("./routes/ratingRoutes"); 
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("Database connected"));
mongoose.set('strictQuery', true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  
app.use(cors());
app.use("/api/brew", brewRoutes);
app.use("/api/bean", beanRoutes);
app.use("/api/rate", rateRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }*/

app.listen(PORT, () => console.log(`server is up and running on ${PORT}`));


