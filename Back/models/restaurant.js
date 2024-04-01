module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        restaurantID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // 자동으로 증가하는 기본 키 설정
        },
        restaurantName: {
            type: DataTypes.STRING(100),
            allowNull: false // 음식점 이름은 null이 될 수 없음
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false // 주소는 null이 될 수 없음
        },
        restaurantNumber: {
            type: DataTypes.STRING(100),
            allowNull: false // 음식점 번호는 null이 될 수 없음
        },
        Category: {
            type: DataTypes.STRING(100),
            allowNull: false // 음식점 카테고리는 null이 될 수 없음
        },
        x: {
            type: DataTypes.DOUBLE,
            allowNull: true // 음식점 경도는 null이 될 수 있음
        },
        y: {
            type: DataTypes.DOUBLE,
            allowNull: true // 음식점 위도는 null이 될 수 있음
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false // 음식점 이미지는 null이 될 수 없음
        },
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Restaurant",
        timestamps: false,
        paranoid: true
    });

   

    return Restaurant;
};
