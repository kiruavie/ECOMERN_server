require("dotenv").config();
const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://wilshere:${process.env.MONGO_PASSWORD}@cluster0.5awyliq.mongodb.net/ecomern`;

mongoose
  .connect(connectionStr, { useNewUrlParser: true })
  .then(() => console.log("connecté à mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("erreur", (err) => {
  console.log(err);
});
