const http = require('http');

const port = 6511;

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
    res.setHeader('Content-Type', 'application/json');


    if (req.method === 'GET' && req.url === '/quote') {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        res.statusCode = 200;
        res.end(JSON.stringify({ quote: randomQuote },null,2));
    }
    else if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            message : 'Hello welcome to my advanced quote generator app',
            about : 'This app is used to generate motivational quotes for users and also allows users to add their own quotes',
            usage : 'Visit /quote to get your random  motivational quotes or send a POST request to /quote to add your own quote'
        },null, 2))
    }else if (req.method === 'POST' && req.url === '/quote') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            try {
                const {newQuote} = JSON.parse(body);

                if (!newQuote.text) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({error : 'Missing Text that is required in body'}));
                    return;
                }

                quotes.push(newQuote.text.trim());
                
                res.statusCode = 201;
                res.end(JSON.stringify({
                    message: 'Quote added successfully',
                    totalQuotes: quotes.length,
                    newQuote: newQuote.text
                }, null,2));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({
            error: 'Route not found, please check the URL and try again !'
        }));
        return;
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})

