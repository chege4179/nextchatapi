const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const cors = require("cors")
const dotenv = require("dotenv")
const app = express();

app.use(cors())
app.use(express.json())

const connection = require("./config/util")
const UserRoutes = require("./Routes/UserRoutes")
const ChatRoutes = require("./Routes/ChatRoutes")
const {sendMessage} = require("./controllers/ChatControllers/sendMessage");
const {updateOnlineStatus} = require("./controllers/ChatControllers/joinRoom");

app.use("/user",UserRoutes)
app.use("/chat",ChatRoutes)
const server = http.createServer(app);

const io = socketio(server,{
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});
//Run when client connects
io.on('connection',async (socket) => {


	socket.on("connected",async (user) => {
		console.log(`${user.email} has connected`)
		await updateOnlineStatus(true,user.email)

	})
	socket.on("disconnect",async (user) => {
		console.log("Disconnect obj :",user)
		console.log(`${user.email} has disconnected`)
		await updateOnlineStatus(false,user.email)
	})
	socket.on("leaveRoom",async (user) => {
		await updateOnlineStatus(false,user.email)
		console.log(`${user.email} wants to disconnect`)

	})
	socket.on("send-message", async (data) => {
		const messageObj = await sendMessage(data.message)
		socket.broadcast.emit("receive-message", data.message);
	});
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
