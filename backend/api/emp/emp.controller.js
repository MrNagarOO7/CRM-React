const { commonResponse, guards } = require('../../helpers');
const service = require('./emp.services');

exports.login = async (req, res) => {
    try{
        const data = await service.login(req.body);
        if(data.success){
            let token = guards.createEmpToken(data.data._doc);
            return commonResponse.success(res, token.token, req.languageCode, data.message);
        }
        return commonResponse.notFound(res, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error Emp login as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};

exports.getProfile = async (req, res) => {
    try{
        const data = await service.getEmp(req.user.id);
        if(data.success){
            return commonResponse.success(res, data.data, req.languageCode, data.message);
        }
        return commonResponse.notFound(res, req.languageCode, data.message);
    } catch (error) {
        logger.error("Error getProfile as ", error);
        return commonResponse.sendUnexpected(res, error, req.languageCode);
    }
};