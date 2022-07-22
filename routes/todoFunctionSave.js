const Todo = require('../models/todo.js');
const User = require('../models/user.js');

async function saveWorkTodo(req,res){
    try{
        const allTodos = req.body;
        const user = await User.findOne({name:req.user.name});
        for(let i=0;i<allTodos.length;i++){
            const newTodo = new Todo({
                todo:allTodos[i].todo
            });
            await newTodo.save();
            user.todos = user.todos.concat(newTodo._id);
            await user.save();
        }
        res.status(200).send("Works Added to your todo list");
    }catch(err){
        console.log(err);
        res.status(500).send("could not saved");
    }
}

module.exports = saveWorkTodo;