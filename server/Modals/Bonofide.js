const mongoose=require('mongoose')
const Student=require("./Student")
const Admin=require("./Admin")

const bonofideSchema=new mongoose.Schema({
    appliedStudentID : {
        type:string,
        ref:'Student',
        required:true
    },

    reasonForBonofide : {
        type:String,
        required:true
    },

    statusOfBonofide : {
        type: String,
        default:"Unverified"
    }
})
