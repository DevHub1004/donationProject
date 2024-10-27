// src/pages/AboutPage.js
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';

const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(null);
    const [content, setContent] = useState(null);
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState('');
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleChangeDesccription = (event) => {
        setDescription(event.target.value);
    };
    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };
    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title != null && description != null && content != null && videoPreview != null && video != null) {
            console.log(title, description, content)
            console.log('Video selected:', video);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('details', content);
            formData.append('video', video);

            // const headers = {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            // }

            try {
                const response = await axios.post('http://localhost:8000/api/upload', formData);
                console.log(`Response: ${JSON.stringify(response.data)}`);
            } catch (error) {
                console.log(`Error: ${error.response ? error.response.data.message : error.message}`);
            }

        } else {
            console.log('No video selected');
        }
    };
    return (
        <Box sx={{ padding: '2rem' }}>
            <Typography>Upload Case</Typography>
            <TextField
                sx={{ margin: "2rem" }}
                label="Enter Title"
                variant="outlined"
                value={title}
                onChange={handleChangeTitle}
            />
            <TextField
                sx={{ margin: "2rem" }}
                label="Enter Description"
                variant="outlined"
                value={description}
                onChange={handleChangeDesccription}
            />
            <TextField
                sx={{ margin: "2rem" }}
                label="Enter Complete Content"
                variant="outlined"
                value={content}
                onChange={handleChangeContent}
            />
            <form >
                <input
                    accept="video/*"
                    style={{ display: 'none' }}
                    id="video-upload"
                    type="file"
                    onChange={handleVideoChange}
                />
                <label htmlFor="video-upload">
                    <Button variant="contained" color="primary" component="span">
                        Upload Video
                    </Button>
                </label>
                {videoPreview && (
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle1">Video Preview:</Typography>
                        <video
                            src={videoPreview}
                            controls
                            style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
                        />
                    </Box>
                )}
            </form>
            <Button variant="contained" onClick={handleSubmit}>Upload Case Data</Button>
        </Box>
    );
};

export default UploadPage;
