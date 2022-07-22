if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const register = require('./userFunctionRegister');
const login = require('./userFunctionLogin');
const deleteUser = require('./userFunctionDelete');
const logout = require('./userFunctionLogout');

const User = require('../models/user.js');
const auth = require('../middleware/authentication.js');
const router = require('express').Router();

router.get('/',async(req,res)=>{
    try{
        const allUsers = await User.find();
        res.status(200).send(allUsers);
    }catch(err){
        console.log("Error in finding Users with error "+err);
        res.sendStatus(500).end();
    }
})

router.post('/register',async(req,res)=>{
    register(req,res);
})

router.post('/login',async(req,res)=>{
    login(req,res);
})

router.delete('/delete',auth,async(req,res)=>{
    deleteUser(req,res);
})

router.post('/logout',auth,async(req,res)=>{
    logout(req,res);
})

module.exports = router;
