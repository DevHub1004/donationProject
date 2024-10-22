
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8000;

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
    },
});
const upload = multer({ storage });

// POST route for handling multiple file uploads
app.post('/api/upload', upload.fields([
    // { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 5 },
    // { name: 'audios', maxCount: 5 },
]), (req, res) => {
    const { title, description, content } = req.body;
    const { video } = req.files;

    const response = {
        "message": 'Files uploaded successfully!'
    };
    console.log(title, description, content, video);
    res.status(200).json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
