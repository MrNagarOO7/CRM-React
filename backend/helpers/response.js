const resParam = require('./respMessages');


exports.sendJoiError = (res, code = 'DEFAULTERR', languageCode = 'en', err, statusCode = 400) => {
    logger.error('JoiError >>>> ', err);
    let JoiError = _.map(err.details, ({ message, context, type, path }) => ({
        message: message.replace(/['"]/g, ''),
        type,
        path
    }));
    let messageDisplay = resParam.getMessage(code, languageCode);
    if (JoiError && JoiError.length > 0 && JoiError[0].message) {
        messageDisplay = JoiError[0].message;
    }
    let response = {
        success: false,
        statusCode: statusCode,
        message: messageDisplay,
        error: JoiError,
        messageCode: code
    };
    return res.status(statusCode).send(response);
};

exports.notFound = (res, languageCode = 'en', code = 'DEFAULTERR', statusCode = 404) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: resParam.getMessage(code, languageCode) || 'Invalid request data',
        data: {},
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.keyAlreadyExist = (res, err, languageCode = 'en', code = 'DEFAULT', statusCode = 409) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: resParam.getMessage(code, languageCode),
        data: {},
        error: err,
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.success = (res, data, languageCode = 'en', code = 'DEFAULT', statusCode = 200) => {
    const resData = {
        success: true,
        message: resParam.getMessage(code, languageCode),
        statusCode: statusCode,
        data,
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, languageCode = 'en', code = 'DEFAULT_INTERNAL_SERVER_ERROR', statusCode = 500) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: resParam.getMessage(code, languageCode),
        data: err,
        messageCode: code
    };
    return res.status(statusCode).send(resData);
};

exports.unAuthentication = (res, data, languageCode = 'en', code = 'DEFAULT_AUTH', statusCode = 401) => {
    const resData = {
        success: false,
        statusCode: statusCode,
        message: resParam.getMessage(code, languageCode),
        data,
        messageCode: 'DEFAULT_AUTH'
    };
    return res.status(statusCode).send(resData);
};
