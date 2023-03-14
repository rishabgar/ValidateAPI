require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.APP_PORT || 8800
const userRouter = require("./api/users/user.router");

app.use(express.json());	

app.use("/api/users",userRouter);

app.listen(port,(err) =>{
	if(err){
		console.log("error");
	}
	else{
		console.log("Server is running on port number:",port);
	}
})















































































