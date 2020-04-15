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

exports.login = async (data) => {
    let mobile = (typeof data.username === "number") ? data.username : null;

    const existHR = await HR.findByDetails(data.username, data.username, mobile);

    if(!existHR){
        return { success: false, message: 'HR_NOT_EXIST', data: existHR };
    }

    if (!bcrypt.compareSync(data.password,existHR.password)) {
        return { success: false, message: 'PSW_INC', data: existHR };
    }

    return { success: true, data: existHR, message: 'LOGIN_SUCCESS' };
};