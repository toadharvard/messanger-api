const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            message.belongsToMany(models.Participant, {
                through: models.ViewedMessage,
            });
        }
    }

    message.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                notNull: true,
            },
            content: {
                type: DataTypes.STRING,
                notNull: true,
                defaultValue: '',
            },
        },
        {
            sequelize,
            modelName: 'Message',
        }
    );
    return message;
};
