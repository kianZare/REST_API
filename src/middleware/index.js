const bcrypt = require ('bcrypt')
const jwt = require("jsonWebToken")
const User = require ('../users/userModel')

exports.hashPass = async (req, res, next) => {
    try {
        // let plainTextPassword = req.body.password
        req.body.password = await bcrypt.hash(req.body.password, 10)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};


exports.comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({username: req.body.username})
        // console.log("user found in my database")
        // console.log(req.user)
        console.log("PLAN TEXT PASSWORD")
        console.log(req.body.password)
        console.log("HASHED PASSWORD")
        console.log(req.user.password)
        
        if (req.user && await bcrypt.compare(req.body.password, req.user.password)){
            console.log("username existe and plain text password matches password")
            next()
        } else {
            throw new Error("incorrect username or password")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};


exports.tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        // console.log("token from header  OF THE REQEST")

        const decodedToken = await jwt.verify(token, process.env.SECRET)

        // console.log(decodedToken._id)

        const user = await User.findById(decodedToken._id)

        // console.log("find by id")
        // console.log(user)
        if(user) {
            next()
        } else {
            throw new Error ("user is not authorised")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};