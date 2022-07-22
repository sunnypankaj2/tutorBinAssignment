if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{ 
    console.log("Connecting to database")   
    if(err) console.log("Error in connecting to database with error "+err); 
    else{ 
        console.log("Connected to database"); 
        app.listen(3000,(err)=>{ 
            if(err) console.log("Error in listening to port 3000 with error "+err); 
            else{
                console.log("Listening at port 3000");
            }
        })
    }
})

app.use(express.json());

app.use('/users',require('./routes/usersRouter'));

app.use('/todo',require('./routes/todoRouter'));













