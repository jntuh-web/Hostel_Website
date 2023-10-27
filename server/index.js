const express=require("express")
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");

const studentAuthRoute=require("./Routes/studentAuth")
const adminAuthRoute=require("./Routes/adminAuth")

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Hostel",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connection succesful"))
.catch(err=>console.log(err))



app.use("/studentAuth",studentAuthRoute);
app.use("/adminAuth",adminAuthRoute);


app.listen(5000,()=>{
    console.log("Server running")
})