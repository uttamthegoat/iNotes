const connectDB = require("./db");
connectDB();

const cors = require("cors");

// express
const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
// parse req.body
app.use(express.json());
// Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
// listen to port
app.listen(port, () => {
  console.log(`iNotes listening at port ${port}`);
});
