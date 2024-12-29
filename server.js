const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const mentorRouter = require("./routes/mentorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const http =require('http');



require("dotenv").config();
const app = express();

// Connect Database
connectDB();

const server = http.createServer(app);

// Middleware
app.use(express.json());

app.use("/api/mentors", mentorRouter);
app.use("/api/students", studentRoutes);

const PORT =  5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
