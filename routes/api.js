const Workout = require('../models/Workout')
const router = require('express').Router()


router.get('/api/workouts', async (req, res) => {
    const allWorkouts = await Workout.find()
    let aggWorkout = allWorkouts.map(workout => {
        let totalDuration = 0
        workout.exercises.forEach(exercise => {
            totalDuration += exercise.duration
        })
        return { ...workout._doc, totalDuration }
    })

    console.log(aggWorkout)
    res.json(aggWorkout)
})

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workouts = await Workout.find({}).limit(7)

        let aggWorkout = workouts.map(workout => {
            let totalDuration = 0
            workout.exercises.forEach(exercise => {
                totalDuration += exercise.duration
            })
            return { ...workout._doc, totalDuration }
        })

        console.log(aggWorkout)
        res.json(aggWorkout)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/api/workouts/:_id', async (req, res) => {

    try {
        const { _id } = req.params
        const { type } = req.body
        console.log(req.body)

        if (type === 'cardio') {
            const { distance, name, duration } = req.body
            const newCardio = await Workout.findOneAndUpdate({ _id }, { $push: { exercises: { type, distance, name, duration } } }, { new: true, rawResult: true })
            // console.log(newCardio)
            res.json(newCardio)
        } else {
            const { weight, sets, reps, name, duration } = req.body
            const newResistance = await Workout.findOneAndUpdate({ _id }, { $push: { exercises: { type, weight, name, duration, sets, reps } } }, { new: true, rawResult: true })
            res.json(newResistance)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/api/workouts', async (req, res) => {

    try {
        const newWorkout = await Workout.create({})
        res.json(newWorkout)

    } catch (err) {

        res.status(500).json(err)

    }

})

module.exports = router