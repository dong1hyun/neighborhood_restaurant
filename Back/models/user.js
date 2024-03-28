module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false // id는 null이 될 수 없음
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true // 이름은 null이 될 수 있음
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true // 비밀번호는 null이 될 수 있음
        },
        x: {
            type: DataTypes.DOUBLE,
            allowNull: true // 사용자 경도는 null이 될 수 있음
        },
        y: {
            type: DataTypes.DOUBLE,
            allowNull: true // 사용자 위도는 null이 될 수 있음
        }
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Users",
        timestamps: false,
        paranoid: true
    });

    // 직접 findByPk 함수 구현
    User.findByPk = async function(id) {
        return await User.findOne({ where: { id } });
    };
    
    return User;
};
