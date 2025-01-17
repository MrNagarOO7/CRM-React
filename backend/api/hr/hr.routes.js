const router = require('express').Router();
const validation = require('./hr.validation');
const controller = require('./hr.controller');
const { commonResponse, guards} = require('../../helpers');

router.post(
    '/login',
    validation.login,
    controller.login
);

router.post(
    '/emp',
    guards.isAuthorized('hr'),
    validation.createEmp,
    controller.createEmp
);

router.get(
    '/emps',
    guards.isAuthorized('hr'),
    controller.listEmps
);

router.use(function (req, res, next) {
    if (!req.route) {
        return commonResponse.notFound(res, req.languageCode, 'NOT_FOUND');
    }
});

module.exports = router;