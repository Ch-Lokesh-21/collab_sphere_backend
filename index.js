require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRegisterRoute = require("./routes/userRoutes/register");
const userLoginRoute = require("./routes/userRoutes/login");
const volunteerRegisterRoute = require("./routes/VolunteerRoutes/register");
const volunteerLoginRoute = require("./routes/VolunteerRoutes/login");
const crudTaskRoutes = require("./routes/taskRoutes/Tasks");
const { verifyJWT } = require("./middleware/verifyJWT");
const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongoose.connect(process.env.MONGOURI).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server Started...")
    })
}).catch((err)=>{
    console.log(err)
})

app.use("/api/user/register" , userRegisterRoute);
app.use("/api/user/login" , userLoginRoute);

app.use("/api/volunteer/register" , volunteerRegisterRoute);
app.use("/api/volunteer/login" , volunteerLoginRoute);

app.use("/api/tasks" , verifyJWT,crudTaskRoutes);
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the API");
});

app.all("*", (req, res) => {
    res.sendStatus(404);
});