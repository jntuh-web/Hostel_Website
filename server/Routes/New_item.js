const express = require("express");
const { Items } = require("../data/Items.json");
const { Itemmodal } = require("../Modals/server")

const router = express.Router();

/**
 * Route: /fixed
 * Method: GET
 * Description: Getting list of all items
 * Access: Public
 * Parameters:none
 */

exports.getAllItems = async (req, res) => {
    const item = Itemmodal.find();
    res.status(200).json({
        sucess: true,
        data: Items
    })
}
/**
 * Route: /fixed
 * Method: POST
 * Description: Creating item
 * Access: Public
 * Parameters:none
 */
exports.createnewItem = async (req, res) => {
    const { data } = req.body;
    const newItem = await Itemmodal.create(data)

    res.status(200).json({
        sucess: true,
        data: Items,
    })
}


exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const Item = await Itemmodal.findOneAndUpdate({ _id: id }, data, { new: true })
    if (!Item) {
        res.status(404).json({
            sucess: false,
            message: "Item not found"
        })
    }

    res.status(200).json({
        sucess: true,
        data: updatedItem
    })
}

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    const Item = await Itemmodal.deleteOne(id);
    if (!Item) {
        res.status(404).json({
            sucess: false,
            message: "Item not found",
        })
    }

    res.status(200).json({
        sucess: true,
        message: "Item deleted sucessfully"
    })
}


module.exports = router;