const Joi = require('@hapi/joi');
const { commonResponse } = require('../../helpers');

exports.login = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    });

    let data = schema.validate(req.body);

    if (data.hasOwnProperty('error')) {
        commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
    } else {
        next();
    }
};

exports.createEmp = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50),
        id: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    let data = schema.validate(req.body);

    if (data.hasOwnProperty('error')) {
        commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
    } else {
        next();
    }
};