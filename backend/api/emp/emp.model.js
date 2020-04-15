const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 5,
            maxlength: 50
        },
        hr_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hr',
            required: true,
        },
        id: {
            type: String,
            unique: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            unique: true,
            required: true,
            minlength: 5,
            maxlength: 255,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        mobile: {
            type: Number,
        },
        skype_id: {
            type: String,
        },
        profile_pic: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    });

const Emp = mongoose.model('emp', empSchema);

exports.findByDetails = async (id = null, email = null, mobile = null) => {
    return await Emp.findOne(
        {
            $or:[
                {id},
                {email},
                {mobile}
            ]
        })
};

exports.createEMP = async (data) => {
    let emp = new Emp(data);
    await emp.save();
    return emp;
};