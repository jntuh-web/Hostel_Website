const express=require("express")
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");

const studentAuthRoute=require("./api/routes/studentAuth")
const adminAuthRoute=require("./api/routes/adminAuth")

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Hostel",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connection succesful"))
.catch(err=>console.log(err))



app.use("/api/studentAuth",studentAuthRoute);
app.use("/api/adminAuth",adminAuthRoute);


app.listen(5000,()=>{
    console.log("Server running")
})