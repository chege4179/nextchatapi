const RoomModel= require("../../Models/RoomModel")
const UserModel= require("../../Models/UserModel")

const joinRoom = async (user) => {


}
const updateOnlineStatus =async (status,email) => {
	const result = await UserModel.findOneAndUpdate({email},{isOnline:status})

}
module.exports =  { updateOnlineStatus,joinRoom }
