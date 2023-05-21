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
http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log("loading " + uri + "...");
    var stats


    try {
        stats = fs.lstatSync(fileName);
    } catch (error) {
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 not found\n')
        res.end()
        return
    }


    if (stats.isFile()) {
        var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]]
        res.writeHead(200, { 'Content-type': mimeType })


        var fileStrem = fs.createReadStream(fileName);
        fileStrem.pipe(res);
    } else if (stats.isDirectory()) {
        res.writeHead(302, { 'Location': 'index.html' })
        res.end()
    } else {
        res.writeHead(500, { 'Content-type': 'text/plain' })
        res.write('500 INternal error\n')
        res.end()
    }

}).listen(1337)