const Routine = require('../models/Routine')
const router = require('express').Router()


router.get('/api/workouts', async (req, res) => {
    res.json({ message: 'Route hit' })

})

router.get('/api/workouts/range', async (req, res) => {
    res.json({ message: 'Route hit' })

})

router.put('/api/workouts/:_id', async (req, res) => {

    try {
        const { _id } = req.params
        const { type } = req.body
        console.log(req.body)

        if (type === 'cardio') {
            const { distance, name, duration } = req.body
            const newCardio = await Routine.findOneAndUpdate({ _id }, { exercises: { type, distance, name, duration } } )
            // console.log(newCardio)
            res.json(newCardio)
        } else {
            const { distance, name, duration } = req.body
            const newResistance = await Routine.findOneAndUpdate({ _id }, { exercises: { type, distance, name, duration } })
            res.json(newResistance)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/api/workouts', async (req, res) => {

    try {

        const newRoutine = await Routine.create({})
        res.json(newRoutine)

    } catch (err) {

        res.status(500).json(err)

    }

})

module.exports = router