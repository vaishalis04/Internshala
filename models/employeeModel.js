const mongoose =require("mongoose")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

const employeeModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First Name is required"],
        minLength:[4,"First Name should be 4 character long"],
    },
    lastname:{
        type:String,
        required:[true,"Last Name is required"],
        minLength:[4,"Last Name should be 4 character long"],
    },
    contact:{
        type:String,
        required:[true,"Contact  is required"],
        maxLength:[10,"Contact must not exceed  10 character long"],
        minLength:[10,"Contact should be 10 character long"],
    },
    
  
email:{
    type:String,
    unique:true,
    required:[true,"Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
organizationname:{
    type:String,
    required:[true,"Organization Name is required"],
    minLength:[4,"First Name should be 4 character long"],
},

organizationlogo:{
    type: Object,
    default:{
        fileId:"",
        url:"https://images.unsplash.com/photo-1704475586727-f59ad968a37a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
    },
},

internships:[
    {type: mongoose.Schema.Types.ObjectId,ref:"internship"}
],
jobs:[
    {type: mongoose.Schema.Types.ObjectId,ref:"job"}

],

password:{
    type:String,
    select:false,
    maxLength:[15,"password should not exceed more than 15 characters."],
    minLength:[6,"password should not exceed more than 6 characters."]

},
resetPasswordToken:{
    type:String,
    default:"0",
}
},
{timestamps:true})
//   safety for password
employeeModel.pre("save" ,function () {
    if(!this.isModified("password")){
        return;
    }
    let salt=bcrypt.genSaltSync(10)
    this.password=bcrypt.hashSync(this.password,salt)

})

// comparing of password
employeeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

employeeModel.methods.getjwttoken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
})

}
const Employee= mongoose.model("employee",employeeModel)

module.exports = Employee