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

module.exports.get = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id: externalId } = event.pathParameters;
  const iconmingAdminKey = event.headers['admin-key'];

  try {
    const { participants, adminKey, drawResult } = await SecretModel.findOne({
      externalId,
    }).select('-_id participants adminKey drawResult').lean()

    // !! -> Obriga a sentença a retornar um booleano
    // Nesse Caso, testamos primeiro se adminKey não está vazio 
    // e depois se é igual ao registrado no banco
    const isAdmin = !!(iconmingAdminKey && iconmingAdminKey === adminKey)


    const result = {
      participants,
      hasDrew: !! drawResult.length,
      isAdmin
    }

    // Em caso de sucesso . . . 
    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

module.exports.draw = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        sucess: false,
      }),
    }
  }
};