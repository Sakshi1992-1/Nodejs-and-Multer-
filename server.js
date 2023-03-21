const express = require("express");

const app = express();
const multer = require("multer");
// get request
// app.get("/test", (req, res) => {
//   res.send("server is running perfectly");
// });

// multer is a library(ex- upload file)
//storage managemnet in multer
// tell multer where will be the destination we want to store our file
const storageofMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    // key value pair
    cb(null, "./public"); //destination public folder//cb is inbult method
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // file name
  },
});
// call the multer to updload single file
const uploadfile = multer({ storage: storageofMulter }).single("file"); //single method to upload single file
app.use("/public/", express.static(__dirname + "/public/")); //why use it
app.post("/", (req, res) => {
  uploadfile(req, res, (err) => {
    if (err) {
      console.log(err.message);
    }
    return res.send(req.file);
  });
});

app.listen(5000, () => {
  console.log("server is running");
});
