const express = require('express');
const path = require('path');
const app = express();



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

const port = 3002;
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});