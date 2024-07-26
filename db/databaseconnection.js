import mongoose from "mongoose";
async function databaseconnection(dburl){
    try{
        const db_option={
            dbname : "chatty"
        }

        await mongoose.connect(dburl , db_option).then(()=>{
            console.log("connected successfully")
        })

    }
    catch(error){
console.log(error)
    }
}

export default databaseconnection;