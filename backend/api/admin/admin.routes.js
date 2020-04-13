const router = require('express').Router();
const validation = require('./admin.validation');
const controller = require('./admin.controller');

router.post(
    '/signup',
    validation.signup,
    controller.signup
);

module.exports = router;