const fs = require('fs');
const http = require('http');
const path = require('path');
const os  = require('os');
const url = require('url');
const crypto = require('crypto');
const sayHello = require('./greetings');
const maths = require('./maths');
const lodash = require('lodash');
const { log } = require('console');
const { watch } = require('fs/promises');


/*const fs = require('fs');

fs,fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }   
    console.log(data);
})*/

/*const server = http.createServer((req,res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain');
    res.end('I am bombing node js')
})

server.listen(3000,() => {
    console.log('server running at http://localhost:3000')
})*/

/*const directory = '/user/local'
const fileName = 'example.txt'

const fullPath = path.join(directory,fileName)

console.log(fullPath);*/

/*console.log('platform:',os.platform());
console.log('CPU Architecture:',os.arch());
console.log('Total Memory:',os.totalmem());
console.log('Freemem:',os.freemem());*/


/*const myUrl = new URL('https:example.com:8080/path/name?query=hello#hash')
console.log('Host',myUrl.host);
console.log('pathname',myUrl.pathname);
console.log('search params',myUrl.searchParams.get('query'));*/

/*const hash = crypto.createHash('sha256');
hash.update('Hello Mike')


console.log(hash.digest('hex'));*/


/*const message = sayHello('Developers')

console.log(message);
console.log(maths.add(1000,500));
console.log(maths.subtract(2000,500));*/


/*const numbers = [1,2,3,4,5]
const reversed = lodash.reverse(numbers)

console.log(reversed);*/

/*const readableStream = fs.createReadStream('example.txt',{encoding:'utf8'})

readableStream.on('data',(chunk)=>{
    console.log(chunk);
})

readableStream.on('end',()=>{
    console.log('Finished reading the file.');
})

readableStream.on('error',(err)=>{
    console.error('Error',err)
})*/

/*const writablestream = fs.createWriteStream('output 2')

writablestream.write('Hello,');
writablestream.write('world')
writablestream.end()

writablestream.on('finish',() => {
    console.log('Finished writing this file')
})*/


/*const readableStream = fs.createReadStream('example.txt')

const writablestream = fs.createWriteStream('example-output.txt')

readableStream.pipe(writablestream)

writablestream.on('finish',() =>{
    console.log('File copied sucessfully');
})*/


/*const readline = require('readline')

const readableStream = fs.createReadStream('example.txt')

const rl = readline.createInterface({input: readableStream})

rl.on('line',(line) =>{
    console.log('line:',line);
})

rl.on('close',() => {
    console.log('Finished processing the task');
})*/


/*fs.mkdir('newDirectory',(err)=>{
    if (err) {
        return console.error('Error creating directory:',err)
    }
    console.log('Directory created successfully')
})*/

/*fs.mkdirSync('newDirectory2')
console.log('Directory created successfully');*/

/*fs.readdir('./',(err,files) =>{
    if (err) {
        return console.log('Error reading the file',err);
    }
    console.log('File successfully Read',files)
})*/

/*const files = fs.readdirSync('./')
console.log('Directory content',files);*/

/*const dirName = 'newDirectory'

if (fs.existsSync(dirName)) {
    console.log('Directory exists');
}else {
    console.log('Directory not found');
    
}*/

/*fs.rmdir('mike.txt',(err)=>{
    if(err){
        return console.error('Error deleting message');
    }
    console.log('Directory deleted successfully');  
})*/


/*fs.rm('output 2',{recursive: true},(err)=>{
    if(err){
        return console.error('Error deleting message',err);
    }
    console.log('Directory deleted successfully');  
})*/


/*fs.rename('folder2','folder1',(err) => {
    if(err){
        return console.error('File rename failed');
    }
    console.log('File renamed successfully');
    
})*/

// fs.stat('./example.txt',(err,stats) => {
//     if (err) {
//         return console.error(err)
//     }
//     console.log('Directory stats:' ,stats);
//     console.log('is Directory:' ,stats.isDirectory);
    
    
// })


// fs.watch('./', (eventType, filename) => {
//     console.log(`Event: ${eventType}`);
//     if (filename) {
//         console.log(`Filename: ${filename}`);
//     }
    
// })
