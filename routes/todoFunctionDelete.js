const Todo = require('../models/todo.js');
const User = require('../models/user.js');

async function deleteWork(req,res){
    try{
        const user = await User.findOne({name:req.user.name})
        let todoToDelete = req.body.todo;
        todoToDelete = await toDelete(req,res);
        if(todoToDelete!==null){
            user.todos = user.todos.filter((todo)=>{
                return todo.toString()!=todoToDelete.toString();
            })
            await user.save();
            await Todo.findByIdAndDelete(todoToDelete);
            res.status(200).send("Deleted");
            console.log("Deleted");
        }else{
            res.send("Could not find work to delete")
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Could not delete");
    }
}

async function toDelete(req,res){
    const user = await User.findOne({name:req.user.name})
    let todoToDelete = req.body.todo;
    for(let i=0;i<user.todos.length;i++){
        const tempTodo = await Todo.findById({_id:user.todos[i]});
        if(tempTodo!==null && tempTodo.todo===todoToDelete) return tempTodo._id;
    }
    return null;
}

module.exports = deleteWork;