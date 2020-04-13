require('dotenv').config();

exports.data = {
    mongo: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    jwt: {
        teacherExpire: process.env.TEACHER_TOKEN_EXPIRE,
        studentExpire: process.env.STUDENT_TOKEN_EXPIRE
    },
};
