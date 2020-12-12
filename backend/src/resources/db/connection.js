const mongoose = require('mongoose');
require('dotenv').config();

let connection = null

const URI = process.env.DATABASE_CONNECTION_STRING;

module.exports = async () => {
  if (!connection) {
    connection = mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    await connection

  }
}