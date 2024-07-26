import mongoose from "mongoose";
import usermodel from "../modal/usermodel.js";

import bcrypt from "bcryptjs"

const register = async (req, res , next)=>{

    try{
        const {username , password , confirmpassword , email} = req.body
        const usernamecheck = await usermodel.findOne({username})
        if(usernamecheck){
            return res.json({msg:"username is already exist" , status:false});
    
        }
        const emailcheck = await usermodel.findOne({email})
        if(emailcheck){
            return res.json({msg:"email is already exist" , status:false});
    
        }
        const hashpassword  = await bcrypt.hash(password , 10)
        const user = await usermodel.create({
            email,
            username,
            password : hashpassword ,
    
        })
        delete user.password
    return res.json({status:true , user})   
    
    }

    

    catch(e)
    {
        next(e)
    }
   
}


const login = async(req,res,next)=>{

    try{
        console.log(req.body);
        const{username , password} = req.body;
        const userfind = await usermodel.findOne({username});
        
        if(!userfind){
          return res.json({status:false , msg:"incorrect username  "})
         
        }
        const userpasswordfind = await bcrypt.compare(password,userfind.password);
        

    
       if(!userpasswordfind){
        return res.json({status:false , msg:"incorrect password "})
        
       }
       delete userfind.password;
       return res.json({status:true , userfind})
    }
    catch(e){
            next(e)
    }
   

    }

const setavatar = async(req, res , next)=>{
    const userid = req.params.id
    const avtarimage = req.body.image
    console.log(avtarimage)
    const userdata = await usermodel.findByIdAndUpdate(userid , {
        isavtarimageset : true , 
        avtarimage
    });
    return res.json({isSet:userdata.isavtarimageset,
        image:userdata.avtarimage,
    })
}
   
const getallusers = async (req,res,next)=>{
try{
const users = await usermodel.find({
    _id : {$ne : req.params.id}
}).select([
    "email",
    "username",
    "avtarimage",
    "_id"

])

return res.json(users)
}
catch(e){

}
}

export {register ,  login , setavatar , getallusers}