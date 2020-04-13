const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
    },
    {
        timestamps: true
    });

const Admin = mongoose.model('admin', adminSchema);

exports.findByDetails = async (username = null, email = null) => {
    return await Admin.findOne(
        {
            $or:[
                {username},
                {email}
                ]
        })
};

exports.createAdmin = async (data) => {
    let admin = new Admin({
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username
    });
    await admin.save();
    return admin;
};