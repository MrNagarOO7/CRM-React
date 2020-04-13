const Joi = require('@hapi/joi');
const { commonResponse } = require('../../helpers');

exports.signup = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(50).required(),
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

exports.createHR = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50),
        username: Joi.string().min(5).max(50),
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