const UserModel = require("../../Models/UserModel")

const searchUser = async (req,res) => {
	try {
		const searchTerm = req.query.query
		const users = await UserModel.find({})
		const searchResults =users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
		return res.json({
			msg:'Search successful',
			success:true,
			users:searchResults,
		})
	}catch (e){
		console.log(e)
		return res.json({
			msg:'Something went wrong',
			success:false,
			users:[]
		})
	}
}

module.exports = { searchUser }
