if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:(email)=>{
            if(!validator.isEmail(email)){
                throw new Error({error:"Invalid email address"})
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 7
    },
    todos:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    tokens:[
        {
            token:{
                type:String,
                required:true
            } 
        }
    ]
});

userSchema.pre('save',async function(next){
    const user = this;
    try{
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8);
        }else{
            next();
        }
    }catch(err){
        console.log(err);
    }
    next();
})

userSchema.statics.verify = async(email, password)=>{
    try{
        const user = await User.findOne({email:email});
        if(user == null){
            throw new Error("Invalid email address");
        }else{
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                throw new Error("Invalid pasword");
            }else{
                return user;
            }
        }
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.generateToken = async function(){
    try{
        const user = this;
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY);
        user.tokens = user.tokens.concat({token})
        await user.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;