const mongoose = require("mongoose")

const UserModel =  new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
	},
	imageUrl:{
		type:String,
		required:true
	},
	chats:{
		type:Array,
		default:[]
	}
})
module.exports = mongoose.model("user",UserModel)
