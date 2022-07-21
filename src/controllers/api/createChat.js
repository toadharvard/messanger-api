const uuidGen = require('uuid').v4;
module.exports = async (req, res) => {
    const models = req.app.get('models');
    const description = req.body.description ? req.body.description : '';
    const chat = await models.Chat.create({
        uuid: uuidGen(),
        description: description,
    });
    return res.json({ uuid: chat.uuid });
};
