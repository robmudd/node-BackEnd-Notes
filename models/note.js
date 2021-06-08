const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(result => {
    console.log("connected successfully")
}).catch(error => {
    console.log(`failed to connect: ${error}`)
})

const noteSchema = mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model("Note", noteSchema)

module.exports = Note