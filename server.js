const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "public/index.html"));
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});
