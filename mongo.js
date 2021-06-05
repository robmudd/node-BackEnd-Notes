const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("must enter password as command line argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://robmudd:${password}@cluster0.zzzoh.mongodb.net/notes-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

/*
const notes = [new Note({
    content: 'GitHub can be confusing',
    date: new Date(),
    important: true,
}), new Note({
    content: 'I need to learn databases',
    date: new Date(),
    important: true,
})]

for (let note of notes) {
    note.save().then(result => {
        console.log('note saved!')
        console.log(result)
        mongoose.connection.close()
    })
}*/

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})