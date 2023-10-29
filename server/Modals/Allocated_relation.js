const mongoose = require("mongoose");

const allocatedSchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    student_roll_no: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true,
    }

}, { timestamps: true })

module.exports = mongoose.model("Allocated", allocatedSchema);