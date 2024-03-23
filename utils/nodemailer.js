const nodemailer = require("nodemailer")
const ErrorHandler = require("./errorHandler")



exports.sendmail = (req,res,next,url)=>{
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smt.gmail.com",
        port:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
    }
    })
     
    const mailOptions ={
        from:"VAISHALI PRIVATE LIMITED <vaishalisingh00q@gmail.com>",
        to:req.body.email,
        subject:"Password Reset Link",
        // text:"Please "
        html: `<h1>Click link below to reset your password</h1>
        <a href="${url}">Password reset link</a>`
    }
     transport.sendMail(mailOptions,(err,info)=>{
        if(err) return next(
            new ErrorHandler("err",500))
            console.log(info)
return res.status(200).json({
    message:"mail sent successfully",url,res
})
        
     })
}