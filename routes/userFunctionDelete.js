const User = require('../models/user.js');

async function deleteUser(req,res){
   try{
        const userToDelete = req.user.name;
        const userToDeleteId =await User.findOne( { name: userToDelete } );
        await User.findByIdAndDelete(userToDeleteId);
        console.log(userToDelete+" Deleted Successfully");
        res.status(200).send("User Deleted");
    }catch(err){
        console.log("Error in deleting user with error "+err);
        res.sendStatus(500);
    }
}

module.exports = deleteUser;