
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();

const studentAuthRoute = require("./Routes/studentAuth")
const adminAuthRoute = require("./Routes/adminAuth")
const bonofideRoute = require("./Routes/bonofide")
const ItemsRouter = require("./Routes/New_item");
const dbconnect = require("./Dbconnection");
dbconnect();

const port = 5000;

app.use(express.json());
app.use(cors())


app.use("/fixed", ItemsRouter);
app.use("/studentAuth", studentAuthRoute);
app.use("/adminAuth", adminAuthRoute);
app.use("/bonofide", bonofideRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});