const express = require('express')
const app = express();
const port = 3000;

app.use(express.static(__dirname))

// serve static files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
})

// server run on port 3000
app.listen(port, () => console.log(`server run on port ${port}`))