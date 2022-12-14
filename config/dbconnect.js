const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI;
const db = async () => {
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log('Database connected');
    })
    .catch((err) => console.log(err));
};
module.exports = db;
