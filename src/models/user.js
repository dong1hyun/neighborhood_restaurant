module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(20)
        },
        location: {
            type: DataTypes.STRING(20)
        }
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });

    return User;
};