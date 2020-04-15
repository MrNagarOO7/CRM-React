const { commonResponse, guards } = require('../../helpers');
const service = require('./admin.services');
const hrService = require('../hr/hr.services');
const empService = require('../emp/emp.services');

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
        let hrData = req.body;
        hrData.admin_id = req.user.id;
        const data = await hrService.saveHR(hrData);
        if(data.success){
            return commonResponse.success(res, {}, req.languageCode, data.message);
        }
        return commonResponse.keyAlreadyExist(res, {}, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error createHR as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};

exports.login = async (req, res) => {
    try{
        const data = await service.login(req.body);
        if(data.success){
            let token = guards.createAdminToken(data.data._doc);
            return commonResponse.success(res, token.token, req.languageCode, data.message);
        }
        return commonResponse.notFound(res, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error login as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};

exports.listEmps = async (req, res) => {
    try{
        const data = await empService.fetchListEmpsForAdmin(req.user.id);
        if(data.success){
            return commonResponse.success(res, data.data, req.languageCode, data.message);
        }
        return commonResponse.notFound(res, req.languageCode, data.message);
    }catch (error) {
        logger.error("Error listEmps as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};