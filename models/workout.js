const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: Date,
    exercises: [
        {type: { 
            type: String,
            required: "Please select exercise type"
        },
        name: {
            type: String,
            required: "Please enter the exercise completed"
        },
        duration: {
            type: Number, 
            required: "Please etner the exercise duration"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
        }
    ]
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
