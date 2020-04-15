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
    let condition = [];
    if(id) {
        condition.push({id});
    }
    if(email) {
        condition.push({email});
    }
    if(mobile) {
        condition.push({mobile});
    }

    return await Emp.findOne(
        {
            $or: condition
        })
};

exports.createEMP = async (data) => {
    let emp = new Emp(data);
    await emp.save();
    return emp;
};

exports.fetchListOfEmpsForAdmin = async (admin_id = null) => {
        let datas = await Emp
        .find({}, 'email', { lean: true })
        .populate({
            path: 'hrs',
            match: { admin_id},
        })
        .exec();
        return datas;
};