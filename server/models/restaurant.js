module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100)
      },
      rating: {
        type: DataTypes.FLOAT()
      },
      address: {
        type: DataTypes.STRING(50)
      },
      category: {
        type: DataTypes.STRING(50)
      },
      phone: {
        type: DataTypes.STRING(15)
      },
      img: {
        type: DataTypes.STRING(1000)
      },
      x: { //x좌표
        type: DataTypes.DOUBLE
      },
      y: { //y좌표
        type: DataTypes.DOUBLE
      }
    }, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "Restaurant", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });
  
    return Restaurant;
  };