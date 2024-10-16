module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false // id는 null이 될 수 없음
        },
        nickName: {
            type: DataTypes.STRING(100),
            allowNull: true // 이름은 null이 될 수 있음
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true // 비밀번호는 null이 될 수 있음
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true // 비밀번호는 null이 될 수 있음
        },
        sessionID: {
            type: DataTypes.STRING(100),
            allowNull: true // null이 될 수 있음
        },
        phone: {
            type: DataTypes.STRING(100),
            allowNull: true // null이 될 수 있음
        }
    }, 
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "User",
        timestamps: false,
        paranoid: true
    });

    // 직접 findByPk 함수 구현
    User.findByPk = async function(id) {
        return await User.findOne({ where: { id } });
    };
    
    return User;
};