const Express = require("express")
const {getChats} = require("../controllers/ChatControllers/getChats");
const {getMessagesByUser} = require("../controllers/ChatControllers/getMessagesByUser");
const router = Express.Router()



router.get("/mychats/:email",getChats)
router.get("/message/:senderEmail/:receiverEmail",getMessagesByUser)

module.exports = router
