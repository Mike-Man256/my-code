const http = require('http');

const port = 7000;


const quotes = [
  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The secret of getting ahead is getting started.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream it. Wish it. Do it.",
  "Great things never come from comfort zones.",
  "Sometimes later becomes never. Do it now."
];


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/quote') {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        res.end(JSON.stringify({ quote: randomQuote },null,2));
    }
    else if (req.url === '/') {
        res.end(JSON.stringify({
            message: 'Hello Everyone,Welcome to Quote generator app',
            about: 'This app is used to generate motivational quotes for users',
            usage: 'Visit /quote to get your motivational quotes'
        },null, 2))
    }
    else if (req.url === '/contact') {
        res.end(JSON.stringify({
            Developer: 'Abu mike onyebuchi',
            email: 'abummike@gmai.com',
            phone: '08106628440'
        }))
    }
    else {
        res.statusCode = 404
        res.end(JSON.stringify({
            error: 'Sorry Error loading the page ,check your network connection !'
        }))
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

