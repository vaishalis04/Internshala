const mongoose =require("mongoose")


const internshipModel = new mongoose.Schema({
    employee : {type: mongoose.Schema.Types.ObjectId,ref:"employee"},
    students :[ {type: mongoose.Schema.Types.ObjectId,ref:"student"}],

    profile:String,
    skill:String,
internshiptype:{type:String,
enum:["in office","Remote"]},
   openings:Number,
   from:String,
   to:String,
   duration:String,
   responsibility:String,
   stipend:{
    status:{
    type:String,enum:["Fixed","Negitiable","Performance based","Unpaid"]
},
amount:Number,
   },

   perks:String,
   assesments:String


},
{timestamps:true})





const Internship= mongoose.model("internship",internshipModel)

module.exports = Internship