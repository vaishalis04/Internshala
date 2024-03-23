const express =require("express")
const { homepage ,employeesignup,employeesignin,employeesignout,currentEmployee,readsingleinternship,createinternship,readinternship,employeesendmail
  ,employeeforgetlink ,employeeresetpassword,employeeupdate,employeeavatar,readsinglejob,createjob,readjob
}
     = require("../controllers/employeeController")
const router = express.Router()
const {isAuthenticated}= require("../middlewares/auth")

// get
router.get("/",homepage)
router.post("/currentEmployee",isAuthenticated,currentEmployee)


router.post("/signup",employeesignup)

router.post("/signin",employeesignin)

router.get("/signout",isAuthenticated,employeesignout)
// // send mail
router.post("/send-mail",employeesendmail)

router.get("/forget-link/:id",employeeforgetlink)

router.post("/reset-password/:id",isAuthenticated,employeeresetpassword)

router.post("/update/:id",isAuthenticated,employeeupdate)

router.post("/avatar/:id",isAuthenticated,employeeavatar)
                         // internships
router.post("/internship/create",isAuthenticated,createinternship)
router.post("/internship/read",isAuthenticated,readinternship)
router.post("/internship/read/:id",isAuthenticated,readsingleinternship)
                            // job
router.post("/job/create",isAuthenticated,createjob)
router.post("/job/read",isAuthenticated,readjob)
router.post("/job/read/:id",isAuthenticated,readsinglejob)


module.exports = router