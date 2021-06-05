const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("must enter password as command line argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://robmudd:${password}@cluster0.zzzoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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