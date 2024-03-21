module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("Favorites", {
      favoritesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // 자동으로 증가하는 기본키 설정
      },
      favoritesitem: {
        type: DataTypes.STRING(50),
      },
    }, 

    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "Favorites", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });
  
    return Favorites;
  };