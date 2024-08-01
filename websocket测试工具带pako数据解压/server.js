const https=require('https');
const http=require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const PORT2 =3001;
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// HTTPS 服务器选项
const options = {
    key: fs.readFileSync('fs\\server.key'),
    cert: fs.readFileSync('fs\\server.crt')
};

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Server is running on https://localhost:${PORT2}`);
// });

// 创建 HTTPS 服务器
https.createServer(options, app).listen(PORT2, () => {
    console.log('HTTPS Server is running on https://localhost:3001');
});
http.createServer(app).listen(PORT, () => {
    console.log('HTTP Server is running on http://localhost:3000');
});
