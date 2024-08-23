const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; //데이터베이스 정보
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};


// config.json 안에 작성 된 데이터베이스 연결 - config.use_env_variable설정 없어서 else로 직접 불러옴.
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
const Favorites = require('./favorites')(sequelize, Sequelize.DataTypes);
// notice 모델 정의
const Notice = require('./notice')(sequelize, Sequelize.DataTypes);


// User 모델과 Review 모델 간의 관계 설정
User.hasMany(Review, {
    foreignKey: 'id', // Review 테이블의 id 컬럼이 외래키
    allowNull: false, // id가 null이 아니어야 함
    onDelete: 'CASCADE' // User 테이블의 레코드가 삭제될 때 Review 테이블에서 해당 id를 가진 레코드를 자동으로 삭제
});
Review.belongsTo(User, {
    foreignKey: 'id' // Review 테이블의 id 컬럼이 외래키
});

// User 모델과 Favorites 모델 간의 관계 설정
User.hasMany(Favorites, {
    foreignKey: 'id', // Favorites 테이블의 id 컬럼이 외래키
    allowNull: false, // id가 null이 아니어야 함
    onDelete: 'CASCADE' // User 테이블의 레코드가 삭제될 때 Favorites 테이블에서 해당 id를 가진 레코드를 자동으로 삭제
});
Favorites.belongsTo(User, {
    foreignKey: 'id' // Favorites 테이블의 id 컬럼이 외래키
});

// Favorites 모델과 Restaurant 모델 간의 일대일 관계 설정
Favorites.belongsTo(Restaurant, {
    foreignKey: 'restaurantId', // Favorites 테이블의 restaurantID 컬럼이 외래키
    onDelete: 'CASCADE' // Restaurant 테이블의 레코드가 삭제될 때 Favorites 테이블에서 해당 restaurantID를 가진 레코드를 자동으로 삭제
});
Restaurant.hasOne(Favorites, {
    foreignKey: 'restaurantId' // Favorites 테이블의 restaurantID 컬럼이 외래키
});





// 검색 및 필터링 + 모델 로드 및 관리
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
// 모델 간의 관계 설정
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; // Sequelize 인스턴스를 db 객체에 할당 + db 객체를 통해 데이터베이스에 접근하고 상호 작용
db.Sequelize = Sequelize; // Sequelize 라이브러리를 db 객체에 할당

module.exports = db;