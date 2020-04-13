const { commonResponse} = require('../../helpers');
const service = require('./admin.services');

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