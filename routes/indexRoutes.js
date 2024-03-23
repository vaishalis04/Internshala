const express =require("express")
const { homepage ,studentforgetlink,studentavatar,studentresetpassword,currentUser,studentsignup,studentsignin,studentsignout,studentsendmail,studentupdate,applyinternship,applyjob} = require("../controllers/indexController")
const router = express.Router()
const {isAuthenticated}= require("../middlewares/auth")

// get
router.get("/",homepage)
router.post("/student",isAuthenticated,currentUser)


router.post("/student/signup",studentsignup)

router.post("/student/signin",studentsignin)

router.get("/student/signout",isAuthenticated,studentsignout)
// send mail
router.post("/student/send-mail",studentsendmail)

router.get("/student/forget-link/:id",studentforgetlink)

router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)

router.post("/student/update/:id",isAuthenticated,studentupdate)

router.post("/student/avatar/:id",isAuthenticated,studentavatar)

// -----------------apply internship-----------------------------

router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship)


// -----------------apply job-----------------------------

router.post("/student/apply/job/:jobid",isAuthenticated,applyjob)





module.exports = router