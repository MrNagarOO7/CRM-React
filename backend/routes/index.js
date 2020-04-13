const { adminRoutes } = require('../api/admin');


const initialize = (app) => {
    app.use('/api/admin', adminRoutes);
    app.get('/ping', (req, res) => {
        res.status(200).send({
            success: true,
            statusCode: 200
        });
    });
};

module.exports = { initialize };
