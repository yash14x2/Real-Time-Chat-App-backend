import mongoose, { mongo } from "mongoose";

const userschema = new mongoose.Schema({
    username : {
        type : String ,
       required : true,
        min:3,
        max:10,
        unique : true 
    },
    email : {
        type:String,
        unique:true,
        required : true,
        max:50
    },

    password : {
        type:String,
        required : true,
        max:50

    },

    isavtarimageset : {
        type:Boolean,
        default:false,

    },
    avtarimage : {
        type:String,
        default:"",
    },

    
}) 

const usermodel = mongoose.model("users" , userschema)
export default usermodel