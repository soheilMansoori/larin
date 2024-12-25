const express = require('express');
const jsonServer = require('json-server');
const path = require('node:path');
const app = express();
const port = 3001;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Setup JSON Server
const router = jsonServer.router('./db/db.json');
const middlewares = jsonServer.defaults();

// Use JSON Server middlewares
app.use('/api', middlewares); // Add '/api' prefix for the JSON Server
app.use('/api', router); // Add JSON Server router under '/api'


// Server not found page 
app.all("*", (req, res) => {
    return res.sendFile(__dirname + '/pages/404/404.html');
})

// Start the Express server
app.listen(port, (error) => {
    if (error) {
        console.log("Server error =>", error);
        return process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
});