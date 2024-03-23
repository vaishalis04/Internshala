const mongoose =require("mongoose")


const jobModel = new mongoose.Schema({
    students : {type: mongoose.Schema.Types.ObjectId,ref:"student"},
    employee : {type: mongoose.Schema.Types.ObjectId,ref:"employee"},
    title:String,
    skill:String,
jobtype:{type:String,
enum:["in office","Remote"]},
   openings:Number,
   description:String,
   preference:String,
   salary:Number,
   perks:String,
   assesments:String
},
{timestamps:true})





const job= mongoose.model("job",jobModel)

module.exports = job