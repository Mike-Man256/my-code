const http = require('http');

const port = 5000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');


    if (req.url === '/') {
        res.end('Welcome to our Home page! / My name is Abu micheal Onyebuchi');
    }
    else if (req.url === '/contact') {
        res.end('Contact our gmail:abumicheal256@gmail.com / phone number +23481028440');
    }
    else {
        res.statusCode = 404;
        res.end('404 Page Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});