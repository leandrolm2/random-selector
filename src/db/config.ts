import mongoose from 'mongoose';
require("dotenv").config();

const dbConnection = () => {
    mongoose.connect(process.env.URL_MONGO!)

    const db = mongoose.connection
    db.once('error', (err) => {
        console.log(err)
    })

    db.once('open', () => {
        console.log('server connected')
    })
}

export default dbConnection
