const router=require('express').Router();
const Student=require('../Modals/Student');
const bcrypt=require("bcrypt")
router.post("/register",async(req,res)=>{
    try{
        const Password=req.body.password
        const ConfirmPassword=req.body.confirmPassword
        if(Password!=ConfirmPassword){
            res.status(400).json("Passwords not matching")
        }
        else{
            const salt=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(req.body.password,salt);
            const newStudent=new Student({
                studentName:req.body.studentName,
                rollNumber:req.body.rollNumber,
                email:req.body.email,
                phone:req.body.phone,
                branch:req.body.branch,
                typeOfCourse:req.body.typeOfCourse,
                dateOfBirth:req.body.dateOfBirth,
                parentPhone:req.body.parentPhone,
                password:hashPassword,
                confirmPassword:hashPassword
            })
            const student=await newStudent.save();
            res.status(200).json(student)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.post("/login",async(req,res)=>{
    try{
        const rollNo=req.body.rollNumber
        const validStudent=await Student.findOne({rollNumber:rollNo})
        const validPassword=await bcrypt.compare(req.body.password,validStudent.password)
        
        if(!validStudent || !validPassword){
            res.status(400).json("Invalid credentials");
        }
        else{
            res.status(200).json(validStudent)
        }
    }catch(err){
        console.log(err)
        res.status(500).json("error")
    }
})

router.put("/:id",async(req,res)=>{
    
        try{
            const updateStudent = await Student.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },{new:true})
            res.status(200).json(updateStudent)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    
})

module.exports=router
