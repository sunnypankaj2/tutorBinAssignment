const Todo = require('../models/todo.js');
const User = require('../models/user.js');

async function getAll(req,res){
    try{
        const user = await User.findOne({name:req.user.name});
        const allTodos = user.todos;
        const todosToSend = [];
        for(let i=0;i<allTodos.length;i++){
            const tempTodo = await Todo.findById({_id:allTodos[i]});
            if(tempTodo!==null) todosToSend.push({todo:tempTodo.todo});
        }
        if(todosToSend.length!==0)res.send(todosToSend);
        else res.send("There is no work in list. Please add some! ")
        
    }catch(err){
        console.log(err);
        res.status(500).send("could not get all works to do with error ");
    }
}

module.exports = getAll;