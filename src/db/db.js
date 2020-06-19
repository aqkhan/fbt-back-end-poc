const mongoose = require('mongoose')

// Express
// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false 
// })


// GraphQL
// mongoose.connect('mongodb://127.0.0.1:27017/fbt-schema-4', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false 
// })

// GraphQL
mongoose.connect('mongodb://127.0.0.1:27017/fbt-schema-test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})


