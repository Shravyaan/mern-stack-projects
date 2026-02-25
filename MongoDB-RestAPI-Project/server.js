const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));
app.use("/product", require("./routes/productRoutes"));

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
