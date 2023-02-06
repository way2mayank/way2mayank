const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route")
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/assignment", {
    useNewUrlparser: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });



  app.use("/", router)

// ERROR HENDLER
app.use("/*", (req, res) => {
  res.status(404).send({ status: false, message: "page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on PORT 3000");
});
