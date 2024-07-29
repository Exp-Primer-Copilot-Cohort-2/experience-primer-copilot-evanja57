// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Data
const comments = [
    {
        id: 1,
        username: "John",
        comment: "Hello World!"
    },
    {
        id: 2,
        username: "Jane",
        comment: "Nice post!"
    }
];

// Routes
app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.send(comments);
});

app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if(comment) {
        res.send(comment);
    } else {
        res.status(404).send("Comment not found");
    }
});

app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newComment = req.body;
    const comment = comments.find(comment => comment.id === id);
    if(comment) {
        comment.username = newComment.username;
        comment.comment = newComment.comment;
        res.send(comment);
    } else {
        res.status(404).send("Comment not found");
    }
});

app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if(index !== -1) {
        comments.splice(index, 1);
        res.send(comments);
    } else {
        res.status(404).send("Comment not found");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});