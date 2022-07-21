module.exports = async (req, res) => {
    const models = req.app.get('models');
    const chat = await models.Chat.findByPk(req.params.uuid);
    const messages = await chat.getMessages();
    const result = await Promise.all(
        messages.map(async (m) => {
            return {
                content: m.content,
                username: (await models.User.findByPk(m.UserId)).username,
            };
        })
    );
    //read last
    const participant = await models.Participant.findOne({
        where: {
            ChatUuid: req.params.uuid,
            UserId: req.user.id,
        },
    });
    await models.ViewedMessage.create({
        MessageId: [...messages].pop().id,
        ParticipantId: participant.id,
    });

    return res.json(result);
};
