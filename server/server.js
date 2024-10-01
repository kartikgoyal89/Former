const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "assets" directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Ensure the assets directory exists
if (!fs.existsSync("assets")) {
  fs.mkdirSync("assets");
}

// Save JSON file
app.post("/save-form", (req, res) => {
  const { fileName, formContent } = req.body;
  const uniqueFileName = `${fileName}.json`; // Removed timestamp for simplicity

  fs.writeFile(
    path.join(__dirname, "assets", uniqueFileName),
    JSON.stringify(formContent),
    (err) => {
      if (err) {
        console.error("Error saving file:", err);
        return res.status(500).json({ message: "Error saving file" });
      }
      res.status(200).json({ message: "File saved successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
