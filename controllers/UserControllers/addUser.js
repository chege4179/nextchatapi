const UserModel = require("../../Models/UserModel")

const addUser = async (req,res) => {
	const { email,image,name } = req.body
	const existingUser = await UserModel.findOne({ email })
	if (existingUser){
		return res.json({
			msg:"A user with a similar email address already exist",
			success:true
		})
	}
	const newUser = new UserModel({
		name,
		email,
		imageUrl:image
	})
	newUser.save()
		.then(() => {
			return res.json({
				msg:"Account created successfully",
				success:true
			})
		})
		.catch((err) => {
			console.log(err)
			return res.json({
				msg:"An error occurred",
				success:false
			})
		})


}

module.exports = { addUser }
