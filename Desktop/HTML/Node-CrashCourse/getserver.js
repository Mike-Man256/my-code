const http = require('http');

const port = 9000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');


    if (req.url === '/') {
        res.end(JSON.stringify('Welcome to my API home page on leraning GET request in Node js / My name is Abu micheal Onyebuchi'));
    }
    else if (req.url === '/About') {
        res.end(JSON.stringify({
            name: 'Abu micheal Onyebuchi',
            age: 22,
            occupation: 'Student',
            country: 'Nigeria',
            niche: 'Backend Development'
        }, null, 2));
    }
    else if (req.url === '/contact') {
        res.end(JSON.stringify ({
            gmail: 'abumike@gmail.com',
            phone: '+23481028440',
            x : '@Mikestar001'
        }, null,2));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify ({error: '404 Page Not Found'}));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})