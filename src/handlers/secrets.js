const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret')

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; //Lambda reultlizar conexão

  const { name, email } = JSON.parse(event.body);
  const externalId = uuidv4();
  const adminKey = uuidv4();

  try {
    await SecretModel.create({
      user: name,
      userEmail: email,
      externalId,
      adminKey,
    })

    return {
      statusCode: 201,
      body: JSON.stringify({
        sucess: true,
        id: externalId,
        adminKey,
      })
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        sucess: false,
      }),
    }
  }

};

module.exports.get = async (event) => {

};

module.exports.draw = async (event) => {

};