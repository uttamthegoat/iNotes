const connectDB = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const GlobalErrorHandler = require("./middleware/GlobalErrorHandler");
const port = 5001;

dotenv.config();
// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
// Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// wrong routes
app.all("*", (req, res) => {
  throw new CustomError(404, false, "Route not found");
});

// handling error using express Global Error Handler
app.use(GlobalErrorHandler);

// listen to port
app.listen(port, () => {
  console.log(`iNotes listening at port ${port}`);
});
