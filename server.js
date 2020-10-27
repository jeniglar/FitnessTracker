const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const { Workout } = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//API ROUTES
     // GET /api/workouts/
app.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

    // POST /api/workouts
app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

    // PUT /api/workouts/:id 
app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    // GET /api/workouts/range
app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });


//HTML ROUTES
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});
