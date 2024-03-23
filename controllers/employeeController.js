const { request } = require("express")
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler =require("../utils/errorHandler")
const Employee = require("../models/employeeModel")
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")
const {sendtoken} =require("../utils/SendTokens")
const { sendmail } = require("../utils/nodemailer")
const imagekit =require("../utils/imagekit").initImageKit()
const path = require("path")
const { userInfo } = require("os")

exports.homepage= catchAsyncErrors(async(req,res,next) =>{
    res.json({message: "Secure employee homepage"})
    })

exports.currentEmployee = catchAsyncErrors(async(req,res,next) =>{
        const employee = await Employee.findById(req.id).exec()
        res.json({employee})
    })
exports.employeesignup= catchAsyncErrors(async(req,res,next) =>{
        const employee=await new Employee(req.body).save()
        sendtoken(employee,201,res)
        })

exports.employeesignin= catchAsyncErrors(async(req,res,next) =>{
            const employee = await Employee.findOne({email:req.body.email}).select("+password").exec()

            if(!employee)return next(new ErrorHandler("user not found",404))
           

            const isMatch = employee.comparepassword(req.body.password)
            if(!isMatch) return next(new ErrorHandler("wrong password",500))
            
            sendtoken(employee,200,res)

        })

 exports.employeesignout= catchAsyncErrors(async(req,res,next) =>{
                res.clearCookie("token");
                res.json({message:"successfully signout"})
                })
exports.employeesendmail= catchAsyncErrors(async(req,res,next) =>{
  const employee=  await Employee.findOne({email:req.body.email}).exec()
  if(!employee)
  return next(
new ErrorHandler("user not found with this mail",404))

const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`

sendmail(req,res,next,url)
employee.resetPasswordToken="1"
await employee.save()
                    res.json({employee,url})
                    })
 exports.employeeforgetlink= catchAsyncErrors(async(req,res,next) =>{
  const employee=  await Employee.findById(req.params.id).exec()
   if(!employee)
 return next(
  new ErrorHandler("user not found with this mail",404))

  if(employee.resetPasswordToken==="1"){
    employee.resetPasswordToken==="0"
    employee.password=req.body.password
  }else{
    return next(
        new ErrorHandler("Invalid Reset Password Link!Please try again",500))
  }
    await employee.save()  
         
      res.status(200).json({
        message:"password has been successfully changed"
      })           
   
  })
  exports.employeeresetpassword= catchAsyncErrors(async(req,res,next) =>{
    
    const employee= await Employee.findById(req.id).exec()
    employee.password=req.body.password
    await employee.save()
    sendtoken(employee,201,res)
           
       
        })           
exports.employeeupdate= catchAsyncErrors(async(req,res,next) =>{
         await Employee.findByIdAndUpdate(req.params.id,req.body).exec()
          res.status(200).json({
            success:true,
            message:"employee updated successfully",
            
          })
          })   
exports.employeeavatar= catchAsyncErrors(async(req,res,next) =>{
  const employee = await Employee.findById(req.params.id).exec()
const file =req.files.avatar
const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

if(employee.avatar.fileId !== ""){
  await imagekit.deleteFile(employee.avatar.fileId)
}

const {fileId,url} = await imagekit.upload({
  file:file.data,
  fileName:modifiedFileName,
})
employee.avatar = {fileId,url}
await employee.save()

res.status(200).json({
  success:true,
  message:"Profile Updated"
})
res.json({image})
}) 

                          // internship
exports.createinternship = catchAsyncErrors(async(req,res,next) =>{
  const employee = await Employee.findById(req.id).exec()
  const internship=await new Internship(req.body).save()
  internship.employee= employee.id
  employee.internships.push(internship._id)
  await internship.save()
  await employee.save()

  res.status(201).json({success:true,internship})
  })

  exports.readinternship = catchAsyncErrors(async(req,res,next) =>{
    const {internships}=await Employee.findById(req.body).populate("internships").exec()
    res.status(200).json({success:true,internships})
  
    })
    exports.readsingleinternship = catchAsyncErrors(async(req,res,next) =>{
      const internship=await Internship.findById(req.params.id).exec()
      if(!internship) return new ErrorHandler("Internship not found")
      res.status(200).json({success:true,internship})
      })


                            // job
      exports.createjob = catchAsyncErrors(async(req,res,next) =>{
        const employee = await Employee.findById(req.id).exec()
        const job=await new Job(req.body).save()
        job.employee= employee.id
        employee.jobs.push(job._id)
        await job.save()
        await employee.save()
      
        res.status(201).json({success:true,job})
        })
      
        exports.readjob = catchAsyncErrors(async(req,res,next) =>{
          const {jobs}=await Employee.findById(req.body).populate("jobs").exec()
          res.status(200).json({success:true,jobs})
        
          })
          exports.readsinglejob = catchAsyncErrors(async(req,res,next) =>{
            const job=await Job.findById(req.params.id).exec()
            if(!job) return new ErrorHandler("job not found")
            res.status(200).json({success:true,job})
            })