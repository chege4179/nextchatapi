const mongoose = require("mongoose")

const RoomModel =  new mongoose.Schema({
	roomId:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	user1:{
		type:String,
		required:true
	},
	user2:{
		type:String,
		required:true
	}
})
module.exports = mongoose.model("rooms",RoomModel)
