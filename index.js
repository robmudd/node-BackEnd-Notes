const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1 >Hello World!</h1>')
})

app.get('/api/notes', (request, response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(n => Number(id) === n.id)
    if (note) {
        response.json(note)
        console.log(note)
    } else {
        console.log('note not found')
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {
    const newNote = request.body
    console.log ("newNote is ", newNote)
    let maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    console.log ("length of notes is ", notes.length)
    console.log("highest id is ", (Math.max(...notes.map(n=> n.id))))
    console.log("maxID is ", maxID)
    newNote.id = (Math.random() * 100000000)
    notes.concat(newNote)
    response.json(newNote)
})

app.delete('/api/notes/:id', (response, request) => {
    const id = (request.params.id)
    notes = notes.filter(note => note.id !== Number(id))
    response.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`app is running on port ${PORT}`)