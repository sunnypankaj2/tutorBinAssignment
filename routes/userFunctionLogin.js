const User = require('../models/user.js');

async function login(req,res){
    try{
        const user = await User.verify(req.body.email, req.body.password);
        const token =await user.generateToken();
        if(!user){
            res.status(401).send("Login failed! Please enter correct email and password or Register");
        }else{
            res.send({token})
        }
    }catch(err){
        res.status(401).send("Login failed! Please enter correct email and password");
    }
}
module.exports = login;