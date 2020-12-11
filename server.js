const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// routes
app.use(require('./controllers/api-routes'))
app.use(require('./controllers/html-routes'))

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`)
})
