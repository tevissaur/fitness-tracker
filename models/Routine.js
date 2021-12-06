const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoutineSchema = new Schema({
    day: {
        type: Date,
        required: "Please enter a date.",
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String
            },
            name: String,
            duration: Number,
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number
        }
    ]
})

const Routine = mongoose.model("Routine", RoutineSchema)

module.exports = Routine