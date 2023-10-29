const router=require("express").Router();
const nodemailer=require("nodemailer")
const Student=require("../Modals/Student")
const Admin=require("../Modals/Admin")
const Bonofide=require("../Modals/Bonofide");
const { application } = require("express");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your@gmail.com', // Your Gmail email address
      pass: 'zsnriadworrmfeiu'   // Your Gmail password or an "App Password" if using 2-factor authentication
    }
  });

//new application
router.post("/applyBonofide",async(req,res)=>{

    try{
        const {appliedStudentID,reasonForBonofide}=req.body;

        const newApplication=new Bonofide({
            appliedStudentID,
            reasonForBonofide,
            
        });

        const appliedStudent=await Student.findById(appliedStudentID)
        if (!appliedStudent) {
            return res.status(404).json({ message: "Student not found" });
          }
        const application=await newApplication.save();

        const populatedApplication = await Bonofide.findById(application._id)
    .   populate('appliedStudentID', 'email studentName')
  .     exec()


        res.status(200).json(populatedApplication);

        console.log(populatedApplication.appliedStudentID.studentName)

        // Sending an email
        const mailOptions = {
            from: populatedApplication.appliedStudentID.email,
            to: 'your@gmail.com', 
            subject: 'New Bonofide Application',
            text: `A new Bonofide application has been submitted by ${populatedApplication.appliedStudentID.studentName}. Reason: ${populatedApplication.reasonForBonofide}`
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to send email" });
            } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(populatedApplication);
            }
        });
        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

//get all unverified bonofides

router.get("/unverified",async(req,res)=>{
    try{
        let unverifiedBonofides=await Bonofide.find({statusOfBonofide : 'Unverified'})
        res.status(200).json(unverifiedBonofides)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//get all verified bonofides

router.get("/verified",async(req,res)=>{
    try{
        let verifiedBonofides=await Bonofide.find({statusOfBonofide : 'Verified'})
        res.status(200).json(verifiedBonofides)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
})



module.exports=router
