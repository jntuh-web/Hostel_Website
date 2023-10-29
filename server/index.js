const express=require("express")
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");

const studentAuthRoute=require("./Routes/studentAuth")
const adminAuthRoute=require("./Routes/adminAuth")
const bonofideRoute=require("./Routes/bonofide")
const allocatedListRoute=require("./Routes/allocatedList")
const employeeListRoute=require("./Routes/employeeList")


app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://jntuh-ucesth:XrnpuRvXoT8WN9bM@cluster0.3mjnvj0.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connection succesful"))
.catch(err=>console.log(err))



app.use("/studentAuth",studentAuthRoute);
app.use("/adminAuth",adminAuthRoute);
app.use("/bonofide",bonofideRoute)
app.use("/allocatedList",allocatedListRoute)
app.use("/employeeList",employeeListRoute)

app.listen(5000,()=>{
    console.log("Server running")
})

