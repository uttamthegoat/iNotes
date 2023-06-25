const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://19516uttam:theBoss123@cluster0.jrluucr.mongodb.net/mernstack?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo succesfully");
  } catch (err) {
    console.error("Error");
  }
};

module.exports = connectDB;
