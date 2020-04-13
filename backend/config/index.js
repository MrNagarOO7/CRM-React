require('dotenv').config();

exports.data = {
    mongo: {
        uri: process.env.DB_HOST,
    },
    jwt: {
        adminExpire: process.env.ADMIN_TOKEN_EXPIRE,
        hrExpire: process.env.HR_TOKEN_EXPIRE,
        empExpire: process.env.EMP_TOKEN_EXPIRE
    },
};
