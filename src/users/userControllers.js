const jwt = require("jsonwebtoken");
const User = require("./userModel")

exports.createUser = async (req, res) => {
    console.log(req)
    try {
        const newUser = await User.create(req.body)
        console.log(newUser)
        res.status(201).send({message: "A user has been succesfully created"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};


exports.readUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({users: users})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            {username: req.body.username},
            {[req.body.key]: req.body.value}
        )
        res.status(200).send({message:"A user felid has been updated"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({username: req.body.username})
        res.status(200).send({message: "A user successfuly deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
};

exports.loginUser = async (req, res) => {
    console.log("middleware passed and controller has been called")
    try {
        const user = await User.findOne({username: req.body.username})
        // console.log(user)
        console.log("username found in our database")
        const token = await jwt.sign({_id: user._id}, process.env.SECRET)
        // console.log(token)
        res.status(200).send({username: user.username, token})
    } catch (error) {
        console.log(error)
        console.log("username not found")
        res.status(500).send({error: error.message})
    }        
};





