const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 5,
            maxlength: 50
        },
        admin_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'admin',
            required: true,
        },
        username: {
            type: String,
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

const HR = mongoose.model('hr', hrSchema);

exports.findByDetails = async (username = null, email = null, mobile = null) => {
    let condition = [];
    if(username) {
        condition.push({username});
    }
    if(email) {
        condition.push({email});
    }
    if(mobile) {
        condition.push({mobile});
    }
    return await HR.findOne(
        {
            $or: condition
        })
};

exports.findById = async (id = null) => {
    return await HR.findById(id);
};

exports.createHR = async (data) => {
    let hr = new HR(data);
    await hr.save();
    return hr;
};