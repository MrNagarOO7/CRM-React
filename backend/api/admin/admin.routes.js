const router = require('express').Router();
const validation = require('./admin.validation');
const controller = require('./admin.controller');
const { commonResponse, guards} = require('../../helpers');

router.post(
    '/signup',
    validation.signup,
    controller.signup
);

router.post(
    '/hr',
    guards.isAuthorized('admin'),
    validation.createHR,
    controller.createHR
);

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