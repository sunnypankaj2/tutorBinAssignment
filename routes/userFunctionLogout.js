const User = require('../models/user.js');

async function logout(req,res){
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token == null;
        })
        await req.user.save();
        res.send("Loged Out");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = logout;