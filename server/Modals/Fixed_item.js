const mongoose = require("mongoose");
import Vendor from "./Vendor";

const fixedItemsSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    item_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    purchase_date: {
        type: Date,
        required: true,
    },
    ItemType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    }
}, { timestamps: true },)

fixedItemsSchema.pre('save', async function (next) {
    try {
        // Find the latest transaction and get its transaction number
        const latestTransaction = await this.constructor.findOne({}, {}, { sort: { tno: -1 } });

        // Increment the transaction number for the current transaction
        this.tno = latestTransaction ? latestTransaction.tno + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.module("Fixed-items", fixedItemsSchema)