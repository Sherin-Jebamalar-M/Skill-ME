import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import multer from "multer";
import { Image } from "./models/post.model.js"
dotenv.config();
import cors from "cors";
app.use(cors({
  origin: 'https://skill-me.vercel.app', // React frontend URL
  credentials: true,              // allow cookies, headers, etc.
}));

const port = process.env.PORT || 8000;
// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 👇 Image upload route (PUT THIS ABOVE connectDB)
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


connectDB()
  .then(() => {
    console.log("Database connected");
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
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
        // console.log("New message: ", newMessage);
        var chat = newMessage.chatId;
        if (!chat.users) return console.log("Chat.users not defined");
        // console.log("Chat.users: ", chat.users);
        chat.users.forEach((user) => {
          // console.log("User: ", user);
          if (user._id === newMessage.sender._id) return;
          io.to(user._id).emit("message recieved", newMessage);
          console.log("Message sent to: ", user._id);
        });
      });

      socket.off("setup", () => {
        console.log("Disconnected from socket");
        console.log("Disconnected from socket");
        socket.leave(userData._id);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
