const router = require('express').Router();
const validation = require('./admin.validation');
const controller = require('./admin.controller');

router.post(
    '/signup',
    validation.signup,
    controller.signup
);

router.post(
    '/hr',
    validation.createHR,
    controller.createHR
);

module.exports = router;