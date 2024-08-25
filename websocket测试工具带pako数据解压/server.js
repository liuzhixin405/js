const https=require('https');
const http=require('http');
const fs = require('fs');
const axios = require('axios');
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
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/ws', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_ws.html'));
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
// app.get('/proxy-image', function(req, res) {  const imageUrl = 'https://img.feixiaohao.hk/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp';
    
//     request(imageUrl, function (error, response, body) {
//         if (error) {
//             console.error('Error fetching image:', error);
//             res.status(500).send('Error fetching image');
//             return;
//         }
//         if (response.statusCode !== 200) {
//             console.error('Error status code:', response.statusCode);
//             res.status(500).send('Failed to fetch image with status code: ' + response.statusCode);
//             return;
//         }
//         res.set('Content-Type', 'image/png');
//         res.send(body);
//     });
// });
app.get('/proxy-image', async (req, res) => {
    const imageUrl = 'https://img.feixiaohao.hk/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp';

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        if (response.status !== 200) {
            console.error('Error status code:', response.status);
            res.status(500).send('Failed to fetch image with status code: ' + response.status);
            return;
        }

        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});