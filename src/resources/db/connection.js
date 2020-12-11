const mongoose = require('mongoose');

let connection = null

const URI = 'mongodb+srv://admin:PjInkhZTqEZaXZC3@cluster0.0t9nw.mongodb.net/dev-secret?retryWrites=true&w=majority'

module.exports = async () => {
  if (!connection) {
    connection = mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    await connection

  }
}