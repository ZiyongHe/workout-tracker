const express = require('express')
const router = express.Router()

const Workout = require('../models/workout')

// A route that finds all the workouts in the database.
router.get('/api/workouts', async function (req, res) {
  try {
    const workouts = await Workout.find({})
    res.status(200).json(workouts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// A route that creates a new workout in the database when the New Workout button is pressed.
// The workout is created for the current day.
// The exercises in the workout are added through the put route.
router.post('/api/workouts', async function (req, res) {
  try {
    const newWorkout = await Workout.create(req.body)
    // console.log(newWorkout)
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(500).json(err)
  }
})

// A route that is triggered when the Add Exercises button is pressed when creating a new workout.
// The new workout object is pushed into an array for the current day.
router.put('/api/workouts/:id', async function (req, res) {
  try {
    const workoutToUpdate = await Workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: req.body },
    })
    res.status(200).json(workoutToUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
})

// A route that finds the last 7 days in the database and sends the data to browser.
// The browswer uses the data to output charts.
router.get('/api/workouts/range', async function (req, res) {
  const workouts = await Workout.find({}).sort({ day: -1 }).limit(7)
  const workoutsReversed = await workouts.reverse()
  // console.log(workouts)
  // console.log(workoutsReversed)
  try {
    res.status(200).json(workoutsReversed)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Export the router.
module.exports = router
