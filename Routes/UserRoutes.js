const Express = require("express")
const {addUser} = require("../controllers/UserControllers/addUser");
const {getAllUsers} = require("../controllers/UserControllers/getAllUsers");
const {searchUser} = require("../controllers/UserControllers/searchUser");
const router = Express.Router()

router.post("/add",addUser)
router.get("/all",getAllUsers)
router.get("/search",searchUser)
module.exports = router
