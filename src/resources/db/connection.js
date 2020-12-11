const mongoose = require('mongoose');

let connection = null

const URI = 'Aqui entra a conf junto ao mongoose'

module.exports = async () => {
  if (!connection) {
    connection = mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    await connection

  }
}