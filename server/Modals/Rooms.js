const mongoose = require("mongoose");
import Hostle from "./Hostle";

const roomSchema = mongoose.Schema({
    room_id: {
        type: Number,
        required: true,
    },
    block_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostle',
        required: true,
    },
    max_capacity: {
        type: Number,
        required: true,
    },
    allocated_number: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.module("Room", roomSchema);