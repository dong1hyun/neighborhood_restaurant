const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

let sequelize;

//config/config.js 파일에 있는 정보를 가져와 sequelize 객체를 생성한다.
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const user = require('./user')(sequelize, Sequelize.DataTypes);
const review = require('./review')(sequelize, Sequelize.DataTypes);
const restaurant = require('./restaurant')(sequelize, Sequelize.DataTypes);

user.hasMany(review, {
    foreignKey: 'userID',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
review.belongsTo(user, {
    foreignKey: 'userID'
})

// 우리가 작성한 Table파일을 찾아온다.
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

//DB에 모델이름을 연결한다.
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;