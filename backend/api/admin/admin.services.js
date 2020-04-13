const Admin = require('./admin.model');
const bcrypt = require('bcryptjs');

exports.saveAdmin = async (data) => {
    const existAdmin = await Admin.findByDetails(data.username, data.email);

    if(existAdmin){
        return { success: false, message: 'ADMIN_EXIST', data: existAdmin };
    }
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(4), null);

    const adminInfo = await Admin.createAdmin(data);

    if(adminInfo){
        return { success: true, data: adminInfo, message: 'ADMIN_SIGNUP' };
    }

};

exports.login = async (data) => {
    const existAdmin = await Admin.findByDetails(data.username, data.username);

    if(!existAdmin){
        return { success: false, message: 'ADMIN_NOT_EXIST', data: existAdmin };
    }

    if (!bcrypt.compareSync(data.password,existAdmin.password)) {
        return { success: false, message: 'PSW_INC', data: existAdmin };
    }

    return { success: true, data: existAdmin, message: 'LOGIN_SUCCESS' };
};

