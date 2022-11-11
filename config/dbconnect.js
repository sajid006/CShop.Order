const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://sajid:1234abcd@cshoporder.tpldnit.mongodb.net/test?retryWrites=true&w=majority';
const db = async () => {
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log('Database connected');
    })
    .catch((err) => console.log(err));
};
module.exports = db;
