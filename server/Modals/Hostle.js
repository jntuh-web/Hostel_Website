const mongoose = require("mongoose");

const hostleSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    hostle_name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.module("Hostle", hostleSchema);