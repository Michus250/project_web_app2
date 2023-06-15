const mongoose = require('mongoose');

sheludeVisitSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
   
    date: {
        type: mongoose.Schema.Types.Date,
        required: true

    },
    
});

const SheludeVisit = mongoose.model("SheludeVisit", sheludeVisitSchema);

module.exports = {SheludeVisit}
