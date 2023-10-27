const router=require('express').Router();
const Admin=require('../models/Admin.js');

router.post("/register",async(req,res)=>{
    try{
        const Password=req.body.password
        const ConfirmPassword=req.body.confirmPassword
        const newAdmin=new Admin({
            adminName:req.body.adminName,
            adminID:req.body.adminID,
            email:req.body.email,
            phone:req.body.phone,
            hostelName:req.body.hostelName,
            designation:req.body.designation,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword

        })
        if(Password!=ConfirmPassword){
            res.status(400).json("Passwords not matching")
        }
        else{
            const admin=await newAdmin.save();
            res.status(200).json(admin)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

module.exports=router
