import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import multer from "multer";
import { Image } from "./models/post.model.js";
dotenv.config();
import cors from "cors";

// Configure CORS for your frontend URL
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'; // Use an environment variable for your frontend URL in production
app.use(cors({
    origin: frontendURL,
    credentials: true,
}));

// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 👇 Image upload route
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { caption, uid } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const newImage = new Image({
            caption,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            user: uid
        });

        await newImage.save();
        res.json({ message: 'Image uploaded successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

app.get('/images', async (req, res) => {
    const images = await Image.find({})
        .populate('user', 'username picture')
        .sort({ createdAt: -1 });

    const formatted = images.map(img => ({
        _id: img._id,
        caption: img.caption,
        user: {
            username: img.user.username,
            picture: img.user.picture
        },
        img: `data:${img.img.contentType};base64,${img.img.data.toString('base64')}`
    }));

    res.json(formatted);
});

// Connect to the database
connectDB()
    .then(() => {
        console.log("Database connected");

        // Initialize Socket.IO server
        const io = new Server(app, { // Pass the Express app to Socket.IO
            pingTimeout: 60000,
            cors: {
                origin: "*", // Adjust this for production security
            },
        });

        io.on("connection", (socket) => {
            console.log("Connected to socket");

            socket.on("setup", (userData) => {
                console.log("Connected to socket in setup: ", userData.username);
                socket.join(userData._id);
                socket.emit("connected");
            });

            socket.on("join chat", (room) => {
                console.log("Joining chat: ", room);
                socket.join(room);
                console.log("Joined chat: ", room);
            });

            socket.on("new message", (newMessage) => {
                var chat = newMessage.chatId;
                if (!chat.users) return console.log("Chat.users not defined");
                chat.users.forEach((user) => {
                    if (user._id === newMessage.sender._id) return;
                    io.to(user._id).emit("message recieved", newMessage);
                    console.log("Message sent to: ", user._id);
                });
            });

            socket.off("setup", () => {
                console.log("Disconnected from socket");
                socket.leave(userData._id);
            });
        });

        // Vercel will handle the listening on a specific port.
        // You do not need to explicitly start the server here.
        // The 'app' object with your routes and middleware is what Vercel needs.
        console.log("Express app and Socket.IO initialized for Vercel.");

    })
    .catch((err) => {
        console.log(err);
    });

// Export the 'app' for Vercel to use
export default app;
