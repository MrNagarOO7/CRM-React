const { adminRoutes } = require('../api/admin');
const { hrRoutes } = require('../api/hr');


const initialize = (app) => {
    app.use('/api/admin', adminRoutes);
    app.use('/api/hr', hrRoutes);
    app.get('/ping', (req, res) => {
        res.status(200).send({
            success: true,
            statusCode: 200
        });
    });
};

module.exports = { initialize };
