const router=require('express').Router();
const Student=require('../Modals/Student');

router.post("/register",async(req,res)=>{
    try{
        const Password=req.body.password
        const ConfirmPassword=req.body.confirmPassword
        const newStudent=new Student({
            studentName:req.body.studentName,
            rollNumber:req.body.rollNumber,
            email:req.body.email,
            phone:req.body.phone,
            branch:req.body.branch,
            typeOfCourse:req.body.typeOfCourse,
            dateOfBirth:req.body.dateOfBirth,
            parentPhone:req.body.parentPhone,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword

        })
        if(Password!=ConfirmPassword){
            res.status(400).json("Passwords not matching")
        }
        else{
            const student=await newStudent.save();
            res.status(200).json(student)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

module.exports=router
