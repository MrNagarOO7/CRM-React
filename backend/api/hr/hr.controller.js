const { commonResponse, guards } = require('../../helpers');
const service = require('./hr.services');

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