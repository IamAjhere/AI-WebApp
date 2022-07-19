const express = require("express");
const app = express();
require("./Database/mongodb.js");
//import routes
const users = require("./Routes/user");

//middleware
app.use(express.json());

//Routes Middlewares
app.use("/api", users);

const port = 2000;
app.listen(port, () => console.log("server started in port", { port }));
