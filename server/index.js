
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const User = require("./userSchema");
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;

/* ----------Database Connection---------- */
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get
app.get("/users", async (req, res) => {
  try {
   User.find({})
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

app.post("/users", async (req, res) => {
  const user = new User({
    ...req.body
  });
  console.log(user)
  try {
    const data = await user.save();
  res.status(200).json({
    data,
    message: "User saved Successfully",
  });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "there was an error",
    });
  }
});
// app.put("/users/:id", (req, res) => {
  
// });
// app.delete("/users/:id", (req, res) => {
 
// });

app.get("/", async (req, res) => {
  res.send("CRUD server is running");
});

app.listen(8800, () => console.log(`CRUD sever running on ${8800}`));
