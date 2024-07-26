import messgaemodel from "../modal/Messagemodel.js";

const sendmessage = async (req , res , next)=>{
    try{
        const {from , to , message} = req.body;
        const data  = await messgaemodel.create({
            message : {text:message},
            users : [from , to],
            sender : from,
        })
        if(data) return res.json({msg : "data added succeesfully " ,  data}) 
        return res.json({msg : "sorry data not added"});
        
    console.log(req.body)
    res.send("ok")

    }

    catch(e){
        next(e)
    }
   

}

const getallmessage= async (req , res , next)=>{
    const {from , to } = req.body;
    const messages = await messgaemodel.find({
        users:{
            $all : [from, to],
        }
    })
    .sort({updateAt:1})

    const projectmessage = messages.map((msg)=>{
        return {
            fromself:msg.sender.toString() === from , 
            message : msg.message.text
        }

    })

    res.json(projectmessage)

}
export {sendmessage , getallmessage}