const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
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
}, opts);

WorkoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue.duration)
    }, 0);
  });


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
