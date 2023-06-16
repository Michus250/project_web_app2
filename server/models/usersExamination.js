const mongoose = require('mongoose');

const userExaminationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description: {
        type: String
    }
});

const UserExamination = mongoose.model("UserExamination", userExaminationSchema);

module.exports = UserExamination;
