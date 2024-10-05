//importing the requirements
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//environment variable config
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

//function to get connected to mongoDB
const DB_connection = () => {
    
mongoose.connect(MONGODB_URI)
.then(
    () => {console.log("DB has been connected")}
)
.catch(
    e => { console.error('An error occured while connecting to database ', e);     
    process.exit(1)
    }
)
}

module.exports = { DB_connection }