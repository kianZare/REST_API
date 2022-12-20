require("dotenv").config()
const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log('Sucsessfully Connectrd')

    } catch (error) {
        console.log(error)
    }
};

connection();