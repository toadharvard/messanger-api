const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const apiRouter = new express.Router();

apiRouter.post('/register', controllers.api.register, controllers.api.login);
apiRouter.post('/login', controllers.api.login);
apiRouter.post(
    '/sendMessage/:uuid',
    middlewares.verifyAccess,
    middlewares.verifyChatExists,
    middlewares.verifyUserInChat,
    controllers.api.sendMessage
);
apiRouter.post(
    '/joinToChat/:uuid',
    middlewares.verifyAccess,
    middlewares.verifyChatExists,
    controllers.api.joinToChat
);
apiRouter.get(
    '/getLastMassages/:uuid',
    middlewares.verifyAccess,
    middlewares.verifyChatExists,
    middlewares.verifyUserInChat,
    controllers.api.getLastMessages
);
apiRouter.post(
    '/createChat',
    middlewares.verifyAccess,
    controllers.api.createChat
);

module.exports = apiRouter;
