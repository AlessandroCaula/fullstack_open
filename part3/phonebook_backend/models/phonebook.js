const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB url')

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Custom validator used for the number format
const validatePhoneNumber = (val) => {
  // If there is no "-" then, it's an invalid number
  if (!val.includes('-')) {
    return false
  }
  // Check if before the "-" there are two or three numbers
  if (val.split('-')[0].length < 2 || val.split('-')[0].length > 3) {
    return false
  }
  return true
}

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: validatePhoneNumber,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
