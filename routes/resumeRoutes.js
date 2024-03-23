const express =require("express")
const router = express.Router()
const {resume,addeducation,editeducation,deleteeducation,addjobs,editjob,deletejob,addinternships,editinternships,deleteinternships,addresponsibilities,editresponsibilities,deleteresponsibilities,addprojects,editprojects,deleteprojects,addskills,editskills,deleteskills,addcourses,editcourses,deletecourses,addaccomplishments,editaccomplishments,deleteaccomplishments}= require("../controllers/resumeController")
const {isAuthenticated}= require("../middlewares/auth")

// get
router.get("/",isAuthenticated,resume)

// Education

router.post("/add-edu",isAuthenticated,addeducation)

router.post("/edit-edu/:eduid",isAuthenticated,editeducation)

router.post("/delete-edu/:eduid",isAuthenticated,deleteeducation)

// Jobs
router.post("/add-job",isAuthenticated,addjobs)

router.post("/edit-job/:jobsid",isAuthenticated,editjob)

router.post("/delete-job/:jobsid",isAuthenticated,deletejob)

// internships

router.post("/add-inter",isAuthenticated,addinternships)

router.post("/edit-internships/:internshipsid",isAuthenticated,editinternships)

router.post("/delete-internships/:internshipsid",isAuthenticated,deleteinternships)

// Responsibility


router.post("/add-responsibilty",isAuthenticated,addresponsibilities)

router.post("/edit-responsibilty/:responsibilitiesid",isAuthenticated,editresponsibilities)

router.post("/delete-responsibilty/:responsibilitiesid",isAuthenticated,deleteresponsibilities)

// projects

router.post("/add-projects",isAuthenticated,addprojects)

router.post("/edit-projects/:projectsid",isAuthenticated,editprojects)

router.post("/delete-projects/:projectsid",isAuthenticated,deleteprojects)

// courses

router.post("/add-courses",isAuthenticated,addcourses)

router.post("/edit-courses/:coursesid",isAuthenticated,editcourses)

router.post("/delete-courses/:coursesid",isAuthenticated,deletecourses)

// skills


router.post("/add-skills",isAuthenticated,addskills)

router.post("/edit-skills/:skillsid",isAuthenticated,editskills)

router.post("/delete-skills/:skillsid",isAuthenticated,deleteskills)

// accomplishments

router.post("/add-accomplishments",isAuthenticated,addaccomplishments)

router.post("/edit-accomplishments/:accomplishmentsid",isAuthenticated,editaccomplishments)

router.post("/delete-accomplishments/:accomplishmentsid",isAuthenticated,deleteaccomplishments)

module.exports = router