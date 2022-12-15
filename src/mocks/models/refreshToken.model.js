const config = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const REFRESHTOKEN_TABLE = "refreshTokens";

const RefreshTokenSchema =  {
    token: {
        type: Sequelize.STRING,
    },
    expiryDate: {
        type: Sequelize.DATE,
    },
};

class RefreshToken extends Model {
    static associate(models) {
        this.belongsTo(models.user, {
        as: "user",
        foreignKey: "userId",
        targetKey: "id",
        });
    }


    static config(sequelize) {
        return {
            sequelize,
            tableName: REFRESHTOKEN_TABLE,
            modelName: "RefreshToken",
            timestamps: false
        };
    }

    static createToken = async function (user) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

        let _token = uuidv4();

        let refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
        });

        return refreshToken.token;
    };

    static verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };
}

module.exports = { RefreshToken, RefreshTokenSchema, REFRESHTOKEN_TABLE };