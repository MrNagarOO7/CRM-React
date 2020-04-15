const Emp = require('./emp.model');
const bcrypt = require('bcryptjs');

exports.saveEmp = async (data) => {
    const existEmp = await Emp.findByDetails(data.id, data.email, data.mobile);

    if(existEmp){
        return { success: false, message: 'EMP_EXIST', data: existEmp };
    }
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(4), null);

    const empInfo = await Emp.createEMP(data);

    if(empInfo){
        return { success: true, data: empInfo, message: 'CREATE_EMP' };
    }

};

exports.login = async (data) => {
    let mobile = (typeof data.username === "number") ? data.username : null;

    const existEmp = await Emp.findByDetails(data.username, data.username, mobile);

    if(!existEmp){
        return { success: false, message: 'EMP_NOT_EXIST', data: existHR };
    }

    if (!bcrypt.compareSync(data.password,existEmp.password)) {
        return { success: false, message: 'PSW_INC', data: existHR };
    }

    return { success: true, data: existEmp, message: 'LOGIN_SUCCESS' };
};