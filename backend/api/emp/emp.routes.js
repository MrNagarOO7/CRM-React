const router = require('express').Router();
const validation = require('./emp.validation');
const controller = require('./emp.controller');
const { commonResponse } = require('../../helpers');

router.post(
    '/login',
    validation.login,
    controller.login
);

router.use(function (req, res, next) {
    if (!req.route) {
        return commonResponse.notFound(res, req.languageCode, 'NOT_FOUND');
    }
});

module.exports = router;