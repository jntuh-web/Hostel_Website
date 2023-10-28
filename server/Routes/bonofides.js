const router=require('express').Router();
const Bonofide=require('../Modals/Bonofide.js');

router.post("/reqbonofide",async(req,res)=>{
    try{
        const newreq=new Bonofide({
            appliedStudentID :req.body.appliedStudentID,
            reasonForBonofide :req.body.reasonForBonofide ,
            statusOfBonofide :req.body.statusOfBonofide 
        })
        await newreq.save();
        //send email here
        res.status(400).json("Request recived successfully")
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})
//here id is student rollnumber
router.get("./borofidereq/:id",async (req,res)=>{
    Bonofide.findById({appliedStudentID:req.params.id}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
    })
router.delete("./borofidereq/:id",async (req,res)=>{
    Complaint.findByIdAndDelete({appliedStudentID:req.params.id}).then(()=>res.send("deleted")).catch(err=>res.json(err))
})
router.put("./grantborofide/:id",async (req,res)=>{
    statusOfBonofide=req.body.status;
    try{
        await Complaint.findByIdAndUpdate({appliedStudentID:req.params.id},{statusOfBonofide:statusOfBonofide}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
        if(statusOfBonofide){
            //send the auto generated email of Bonofide
        }
        res.status(200).send("updated")
    }
    catch(err){
        res.status(400).json(err)
    }
})
module.exports=router
