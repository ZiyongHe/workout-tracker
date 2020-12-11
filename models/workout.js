const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: { type: String },
        name: { type: String },
        duration: { type: Number },
        weight: { type: Number },
        reps: { type: Number },
        sets: { type: Number },
        distance: { type: Number },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
)

// Create a virtual, a property that isn't stored in the database, that computes the totalDuration.
// totalDuration is used in workout.js to display the total time put into an exercise.
workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration
  }, 0)
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
