const { commonResponse} = require('../../helpers');
const service = require('./admin.services');
const hrService = require('../hr/hr.services');

exports.signup = async (req, res) => {
    try{
        const data = await service.saveAdmin(req.body);
        if(data.success){
            return commonResponse.success(res, {}, req.languageCode, data.message);
        }
        return commonResponse.keyAlreadyExist(res, {}, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error Admin signup as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};

exports.createHR = async (req, res) => {
    try{
        // ADD Admin Id using JWT
        // req.body.admin_id = "5e94b1a2ad3d313ec0f72609";
        const data = await hrService.saveHR(req.body);
        if(data.success){
            return commonResponse.success(res, {}, req.languageCode, data.message);
        }
        return commonResponse.keyAlreadyExist(res, {}, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error createHR as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};