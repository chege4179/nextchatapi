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

app.use("/user",UserRoutes)
app.use("/chat",ChatRoutes)
const server = http.createServer(app);

const io = socketio(server,{
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});
// Run when client connects
io.on('connection',async (socket) => {

	socket.on("connected",(user) => {
		console.log(`${user.email} has connected`)
	})
	socket.on("joinRoom",({ sender,receiver }) => {
		const room1 = `${sender}-${receiver}`
		const room2 = `${receiver}-${sender}`
		socket.join(room1)
		socket.join(room2)


		socket.on("send-message",async (message) => {
			const messageObj = await sendMessage(message)

			socket.to([room1,room2]).emit("receive-message",messageObj)

		})

	})

});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
