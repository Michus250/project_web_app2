const mongoose = require('mongoose');

const scheduleVisitSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
});

const ScheduleVisit = mongoose.model("ScheduleVisit", scheduleVisitSchema);

module.exports = ScheduleVisit;
