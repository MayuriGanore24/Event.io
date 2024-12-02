const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://Mayuri:Mayuri@eventio.bfkto.mongodb.net/EventIo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Ensure Upload Directory Exists
const uploadPath = './upload/images';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Mongoose Schema and Models
const Event = mongoose.model("event", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Users = mongoose.model('Users', {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    CartData: { type: Object },
    Date: { type: Date, default: Date.now }
});

// API Endpoints
app.get("/", (req, res) => {
    res.send("Express app running!!");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Multer Configuration
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Serve Static Files
app.use('/images', express.static(uploadPath));

// Upload Image Endpoint
app.post("/upload", upload.single('event'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
});

// Add Event Endpoint
app.post("/addevent", async (req, res) => {
    const events = await Event.find({});
    const id = events.length > 0 ? events[events.length - 1].id + 1 : 1;

    const event = new Event({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    await event.save();
    res.json({ success: true, message: "Event saved successfully", event });
});

// Fetch All Events
app.get('/allevents', async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "User already registered with same email ID" });
    }

    const cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        CartData: cart
    });

    await user.save();

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Invalid email or password" });
        }
    } else {
        res.json({ success: false, errors: "Invalid email address" });
    }
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header('auth_token');
    if (!token) {
        return res.status(401).json({ errors: "Oops, invalid token!" });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ errors: "Oops, invalid token!" });
    }
};

// Cart Operations
app.post("/addtocart", fetchUser, async (req, res) => {
    const userData = await Users.findOne({ _id: req.user.id });
    userData.CartData[req.body.ItemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { CartData: userData.CartData });
    res.send("Added to cart successfully!");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
    const userData = await Users.findOne({ _id: req.user.id });
    if (userData.CartData[req.body.ItemId] > 0) {
        userData.CartData[req.body.ItemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { CartData: userData.CartData });
        res.send("Removed from cart successfully!");
    }
});

app.post("/getcart", fetchUser, async (req, res) => {
    const userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.CartData);
});

// Start the Server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.error(`Error starting server: ${error}`);
    }
});
