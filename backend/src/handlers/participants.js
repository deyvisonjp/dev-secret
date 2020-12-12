const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret')

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: secretId } = event.pathParameters;
  const { email, name } = JSON.parse(event.body);
  const externalId = uuidv4()

  try {
    const result = await SecretModel.updateOne(
      {
        externalId: secretId,
        'participants.email': { $ne: email } // Confere para que não haja participants(email) duplicados
      },
      { // No segundo parametro passamos o que vamos fazer no update
        $push: {
          participants: {
            externalId,
            name,
            email,
          }
        }
      }
    )

    if (!result.nModified) {
      throw new Error()
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        sucess: true,
        id: externalId,
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


module.exports.delete = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: secretId, participantId } = event.pathParameters;
  const adminKey = event.headers['admin-key'];

  try {

    const result = await SecretModel.updateOne(
      { // Faz o filtro, é necessário as duas cariaveis
        externalId: secretId,
        adminKey,
      },
      { // Alteração dentro do array
        $pull: {
          participants: {
            externalId: participantId,
          }
        }
      }
    )

    if (!result.nModified) {
      throw new Error()
    }

    return {
      statusCode: 204,
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