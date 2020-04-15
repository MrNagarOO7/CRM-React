const jwt = require('jsonwebtoken');
const commonResponse = require('./response');
const config = require('../config');
const adminService = require('../api/admin/admin.services');
const hrService = require('../api/hr/hr.services');
const empService = require('../api/emp/emp.services');


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

const createEmpToken = (emp) => {
    const payload = {
        id: emp._id.toString(),
        email: emp.email,
        name: emp.name,
        user_id: emp.id,
        type: 'emp',
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
            if(req.user.type !== 'hr'){
                commonResponse.unAuthentication(res, {}, req.languageCode);
            } else {
                const hr = await hrService.findById(req.user.id);
                if(!hr){
                    commonResponse.unAuthentication(res, {}, req.languageCode,'HR_NOT_EXIST');
                } else {
                    next();
                }
            }
        } else {
            if(req.user.type !== 'emp'){
                commonResponse.unAuthentication(res, {}, req.languageCode);
            } else {
                next();
            }
        }
    } else {
        commonResponse.unAuthentication(res, {});
    }
};

module.exports = {
    createAdminToken,
    createEmpToken,
    createHRToken,
    isAuthorized
};
