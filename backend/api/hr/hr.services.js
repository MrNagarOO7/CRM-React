const HR = require('./hr.model');
const bcrypt = require('bcryptjs');

exports.saveHR = async (data) => {
    const existHR = await HR.findByDetails(data.username, data.email, data.mobile);

    if(existHR){
        return { success: false, message: 'HR_EXIST', data: existHR };
    }
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(4), null);

    const hrInfo = await HR.createHR(data);

    if(hrInfo){
        return { success: true, data: hrInfo, message: 'CREATE_HR' };
    }

};