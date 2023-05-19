const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');


const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "css": "text/css",
    "js": "text/javascript",
    "json": "application/json",
}


http.createServer(function(req, res) {
    const pathName = url.parse(req.url).pathname;
    const filePath = path.join(__dirname, pathName);
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || "text/plain";
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
}).listen(8080);