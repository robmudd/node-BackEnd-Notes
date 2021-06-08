require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Note = require('./models/note')
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

/*const password = process.argv[2]

const url = `mongodb+srv://robmudd:${password}@cluster0.zzzoh.mongodb.net/notes-app?retryWrites=true&w=majority`

console.log(`password is ${password}`)

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const noteSchema = mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const Note = mongoose.model("Note", noteSchema)*/


app.get('/', (request, response) => {
    response.send('<h1 >Hello World!</h1>')
})

app.get('/api/notes', (request, response) =>{
    //response.json(notes)
    Note
        .find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    
    Note.findById(id).then(note => {
        response.json(note)
    }).catch(error => {
        console.log('note not found')
        response.status(404).end()
    })
    
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({error: "error-- content missing from note!"})
    }
    const newNote = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    console.log ("newNote is ", newNote)
    newNote.save().then(savedNote=> {
        response.json(savedNote)
    })
})

app.delete('/api/notes/:id', (response, request) => {
    const id = (request.params.id)
    notes = notes.filter(note => note.id !== Number(id))
    response.status(204).end()
})

const PORT = process.env.PORT

app.listen(PORT)
console.log(`app is running on port ${PORT}`)