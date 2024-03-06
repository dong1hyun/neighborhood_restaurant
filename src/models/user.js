const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
              type: Sequelize.STRING(20),
              allowNull: false,
              primaryKey: true,
            },
            nickName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            review: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            // rating: {
            //     type: Sequelize.NUMBER,
            //     allowNull: true,
            // },
            // comment: {
            //     type: Sequelize.TEXT,
            //     allowNull: true,
            // },
            // reviewed_restaurant: {
            //     type: Sequelize.NUMBER,
            //     allowNull: true,
            // }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.User.hasmany(db.review, { foreignKey: 'reviewer', sourceKey: 'id' });
    }
}