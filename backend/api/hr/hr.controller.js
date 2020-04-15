const { commonResponse, guards } = require('../../helpers');
const service = require('./hr.services');
const empService = require('../emp/emp.services');

exports.login = async (req, res) => {
    try{
        const data = await service.login(req.body);
        if(data.success){
            let token = guards.createHRToken(data.data._doc);
            return commonResponse.success(res, token.token, req.languageCode, data.message);
        }
        return commonResponse.notFound(res, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error HR login as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};

exports.createEmp = async (req, res) => {
    try{
        // ADD Admin Id using JWT
        let empData = req.body;
        empData.hr_id = req.user.id;
        const data = await empService.saveEmp(empData);
        if(data.success){
            return commonResponse.success(res, {}, req.languageCode, data.message);
        }
        return commonResponse.keyAlreadyExist(res, {}, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error createEmp as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};