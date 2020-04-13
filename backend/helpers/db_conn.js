const mongoose = require('mongoose');

exports.getConnection = async (config) => {
    await mongoose.connect(config.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongodb Connected");
        logger.info("Mongodb Connected")
    }).catch((err => {
        logger.error("Error to Connect Mongodb as ", err);
    }));

    return mongoose;
};
