'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            user.belongsToMany(models.Chat, { through: models.Participant });
            user.hasMany(models.Message);
        }
    }

    user.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                notNull: true,
            },
            hashedPassword: {
                type: DataTypes.STRING,
                notNull: true,
            },
            salt: {
                type: DataTypes.STRING,
                notNull: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return user;
};
