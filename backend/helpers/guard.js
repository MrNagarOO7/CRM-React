const jwt = require('jsonwebtoken');
const commonResponse = require('./response');
const config = require('../config');
const adminService = require('../api/admin/admin.services');


const createAdminToken = (admin) => {
    const payload = {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        username: admin.username,
        type: 'admin',
    };
    const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: config.data.jwt.adminExpire });
    payload.token = token;
    return payload;
};

const createHRToken = (hr) => {
    const payload = {
        id: hr._id.toString(),
        email: hr.email,
        name: hr.name,
        username: hr.username,
        type: 'hr',
    };
    const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: config.data.jwt.adminExpire });
    payload.token = token;
    return payload;
};

const verifyJWT = (req, res) => {
    try {
        const token = req.headers.authorization;
        const userInfo = jwt.verify(token, process.env.JWTSECRET);
        req.user = userInfo;
        return 1;
    } catch (error) {
        return 0;
    }
};

const   isAuthorized = (user) => async (req, res, next) => {
    const isVerify = verifyJWT(req, res);
    if(isVerify){
        if(user === 'admin') {
            if(req.user.type !== 'admin'){
                commonResponse.unAuthentication(res, {}, req.languageCode);
            } else {
                const admin = await adminService.findById(req.user.id);
                if(!admin){
                    commonResponse.unAuthentication(res, {}, req.languageCode,'ADMIN_NOT_EXIST');
                } else {
                    next();
                }
            }
        } else if (user === 'hr') {
        } else {
        }
    } else {
        commonResponse.unAuthentication(res, {});
    }
};

module.exports = {
    createAdminToken,
    createHRToken,
    isAuthorized
};
