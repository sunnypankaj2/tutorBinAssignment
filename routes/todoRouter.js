if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
 }

const getAll = require('./todoFunctionGet');
const saveWorkTodo = require('./todoFunctionSave');
const deleteWork = require('./todoFunctionDelete');

const auth = require('../middleware/authentication.js');
const router = require('express').Router();

router.get('/', auth, async (req,res)=>{
    getAll(req,res);
})

router.post('/', auth, async(req,res)=>{
    saveWorkTodo(req,res);
});

router.delete('/', auth, async(req,res)=>{
    deleteWork(req,res);
});

module.exports = router;