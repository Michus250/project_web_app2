const mongoose = require('mongoose');

userExaminationSchema = mongoose.Schema({
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
    description: {
        type: String
    }
})
const UserExamination = mongoose.model("UserExamination", userExaminationSchema);

module.exports = {UserExamination}