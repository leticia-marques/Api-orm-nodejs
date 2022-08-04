const express = require("express");
const routes = require("./routes")

var app = express();

routes(app);


app.listen(8000, ()=>{
	console.log("Working")
})
