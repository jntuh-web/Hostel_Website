const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();

const ItemsRouter = require("./Routes/New_item");
const dbconnect = require("./Dbconnection");
dbconnect();

const port = 8000;

app.use(express.json());
app.use(cors())

app.use("/fixed", ItemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});