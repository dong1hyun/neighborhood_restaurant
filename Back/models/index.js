const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

let sequelize;

// config/config.js 파일에 있는 정보를 가져와 sequelize 객체를 생성한다.
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// user 모델 정의
const User = require('./user')(sequelize, Sequelize.DataTypes);
// review 모델 정의
const Review = require('./review')(sequelize, Sequelize.DataTypes);
// restaurant 모델 정의
const Restaurant = require('./restaurant')(sequelize, Sequelize.DataTypes);
// favorites 모델 정의
const Favorites = require('./Favorites')(sequelize, Sequelize.DataTypes);

// User 모델과 Review 모델 간의 관계 설정
User.hasMany(Review, {
    foreignKey: 'id', // Review 테이블의 userID 컬럼이 외래키
    allowNull: false, // userID가 null이 아니어야 함
    onDelete: 'CASCADE' // User 테이블의 레코드가 삭제될 때 Review 테이블에서 해당 userID를 가진 레코드를 자동으로 삭제
});
Review.belongsTo(User, {
    foreignKey: 'id' // Review 테이블의 userID 컬럼이 외래키
});

// User 모델과 Favorites 모델 간의 관계 설정
User.hasMany(Favorites, {
    foreignKey: 'id', // Favorites 테이블의 userID 컬럼이 외래키
    allowNull: false, // userID가 null이 아니어야 함
    onDelete: 'CASCADE' // User 테이블의 레코드가 삭제될 때 Favorites 테이블에서 해당 userID를 가진 레코드를 자동으로 삭제
});
Favorites.belongsTo(User, {
    foreignKey: 'id' // Favorites 테이블의 userID 컬럼이 외래키
});

// Review 모델과 Restaurant 모델 간의 관계 설정
Review.belongsTo(Restaurant, {
    foreignKey: 'restaurantID' // Review 테이블의 restaurantID 컬럼이 외래키
});
Restaurant.hasMany(Review, {
    foreignKey: 'restaurantID', // Review 테이블의 restaurantID 컬럼이 외래키
    allowNull: false, // restaurantID가 null이 아니어야 함
    onDelete: 'CASCADE' // Restaurant 테이블의 레코드가 삭제될 때 Review 테이블에서 해당 restaurantID를 가진 레코드를 자동으로 삭제
});

// 우리가 작성한 Table 파일을 찾아온다.
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// DB에 모델 이름을 연결한다.
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
