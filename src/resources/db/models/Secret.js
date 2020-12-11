const mongoose = require('mongoose')

const Schema = {
  user: String,
  userEmail: String,
  adminKey: String,
  externalId: String, //Por boas práticas não vamos expor o Id admin
  participants: [{
    _id: false, //Por padrão seria criado um id, não queremos que isso aconteça.
    externalId: String,
    email: String,
    name: String,
  }],
  drawResult: [{
    _id: false, //Por padrão seria criado um id, não queremos que isso aconteça.
    giver: String,
    receiver: String,
  }],
}

module.exports = mongoose.model('Secret', Schema)