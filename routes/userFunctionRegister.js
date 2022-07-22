const User = require('../models/user.js');

async function register(req,res){
   try{
        const newUser =new User(req.body)
        await newUser.save();
        res.status(200).send("User Saved").end();
    }catch(err){
        console.log("Error in saving user credentials with error "+err);
        res.sendStatus(500).end();
    }
}
module.exports = register;