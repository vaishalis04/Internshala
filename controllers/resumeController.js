const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const ErrorHandler =require("../utils/errorHandler")
const Student = require("../models/studentModel")
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async(req,res,next) =>{
    const {resume} = await Student.findById(req.id).exec()
    res.json({message: "Secure resume page",resume})
})
exports.addeducation = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
        student.resume.education.push({...req.body, id: uuidv4()})
        await student.save()
        res.json({message: "Education Added",})
})
exports.editeducation = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const eduIndex =  student.resume.education.findIndex((i) => i.id === req.params.eduid)
    student.resume.education[eduIndex]= {...student.resume.education[eduIndex],...req.body,}
            await student.save()
            res.json({message: "Education updated",})
})
exports.deleteeducation = catchAsyncErrors(async(req,res,next) =>{
                const student = await Student.findById(req.id).exec()
        const filterededucation =  student.resume.education.filter((i) => i.id !== req.params.eduid)
        student.resume.education= filterededucation
                await student.save()
                res.json({message: "Education Deleted",})
})

exports.addjobs = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.jobs.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "job Added"})
})

exports.editjob = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const jobsIndex =  student.resume.jobs.findIndex((i) => i.id === req.params.jobsid)
student.resume.jobs[jobsIndex]= {...student.resume.jobs[jobsIndex],...req.body,}
        await student.save()
        res.json({message: "job updated",})
})
exports.deletejob = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredjobs =  student.resume.jobs.filter((i) => i.id !== req.params.jobsid)
    student.resume.jobs= filteredjobs
            await student.save()
            res.json({message: "job Deleted",})
})

exports.addinternships = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.internships.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "internship Added"})
})
exports.editinternships = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const internshipsIndex =  student.resume.internships.findIndex((i) => i.id === req.params.internshipsid)
student.resume.internships[internshipsIndex]= {...student.resume.internships[internshipsIndex],...req.body,}
        await student.save()
        res.json({message: "Internships updated",})
})

exports.deleteinternships = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredinternships =  student.resume.internships.filter((i) => i.id !== req.params.internshipsid)
    student.resume.internships= filteredinternships
            await student.save()
            res.json({message: "Internship Deleted",})
})

exports.addresponsibilities = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.responsibilities.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "Responsibility Added"})
})
exports.editresponsibilities = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const responsibilitiesIndex =  student.resume.responsibilities.findIndex((i) => i.id === req.params.responsibilitiesid)
student.resume.responsibilities[responsibilitiesIndex]= {...student.resume.responsibilities[responsibilitiesIndex],...req.body,}
        await student.save()
        res.json({message: "Responsibility updated",})
})

exports.deleteresponsibilities = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredresponsibilities =  student.resume.responsibilities.filter((i) => i.id !== req.params.responsibilitiesid)
    student.resume.responsibilities= filteredresponsibilities
            await student.save()
            res.json({message: "Responsibility Deleted",})
})

exports.addcourses = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.courses.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "course Added"})
})
exports.editcourses = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const coursesIndex =  student.resume.courses.findIndex((i) => i.id === req.params.coursesid)
student.resume.courses[coursesIndex]= {...student.resume.courses[coursesIndex],...req.body,}
        await student.save()
        res.json({message: "courses updated",})
})

exports.deletecourses = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredcourses =  student.resume.courses.filter((i) => i.id !== req.params.coursesid)
    student.resume.courses= filteredcourses
            await student.save()
            res.json({message: "courses Deleted",})
})

exports.addprojects = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.projects.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "projects Added"})
})
exports.editprojects = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const projectsIndex =  student.resume.projects.findIndex((i) => i.id === req.params.projectsid)
student.resume.projects[projectsIndex]= {...student.resume.projects[projectsIndex],...req.body,}
        await student.save()
        res.json({message: "projects updated",})
})

exports.deleteprojects = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredprojects =  student.resume.projects.filter((i) => i.id !== req.params.projectsid)
    student.resume.projects= filteredprojects
            await student.save()
            res.json({message: "projects Deleted",})
})

exports.addskills = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.skills.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "skills Added"})
})
exports.editskills = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const skillsIndex =  student.resume.skills.findIndex((i) => i.id === req.params.skillsid)
student.resume.skills[skillsIndex]= {...student.resume.skills[skillsIndex],...req.body,}
        await student.save()
        res.json({message: "skills updated",})
})

exports.deleteskills = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredskills =  student.resume.skills.filter((i) => i.id !== req.params.skillsid)
    student.resume.skills= filteredskills
            await student.save()
            res.json({message: "skills Deleted",})
})

exports.addaccomplishments = catchAsyncErrors(async(req,res,next) =>{
    const student = await Student.findById(req.id).exec()
    student.resume.accomplishments.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message: "accomplishments Added"})
})
exports.editaccomplishments = catchAsyncErrors(async(req,res,next) =>{
        const student = await Student.findById(req.id).exec()
const accomplishmentsIndex =  student.resume.accomplishments.findIndex((i) => i.id === req.params.accomplishmentsid)
student.resume.accomplishments[accomplishmentsIndex]= {...student.resume.accomplishments[accomplishmentsIndex],...req.body,}
        await student.save()
        res.json({message: "accomplishments updated",})
})

exports.deleteaccomplishments = catchAsyncErrors(async(req,res,next) =>{
            const student = await Student.findById(req.id).exec()
    const filteredaccomplishments =  student.resume.accomplishments.filter((i) => i.id !== req.params.accomplishmentsid)
    student.resume.accomplishments= filteredaccomplishments
            await student.save()
            res.json({message: "accomplishments Deleted",})
})