const http = require('http');

const port = 8007

let tasks = [ 
    {id : 1, title : "Build quote generator app", completed : true},
    {id : 2, title : "Learn Node.js", completed : true},
    {id : 3, title : "Learn Git", completed : false},
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET'  && req.url === '/tasks') {
        res.statusCode = 200;
        res.end(JSON.stringify({tasks},null,2));
    }
    else if (req.method === 'POST'  && req.url === '/tasks') {
        let body = '';


        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const newTask = JSON.parse(body);

                if (!newTask.title) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ error: 'Missing title in request body' }));
                }
                const newTaskObj = {
                    id: tasks.length + 1,
                    title: newTask.title.trim(),
                    completed: newTask.completed || false
                };

                tasks.push(newTaskObj);

                res.statusCode = 201;
                res.end(JSON.stringify({
                    message : 'Tasks added successfully',
                    newTask : newTaskObj,
                    totalTasks : tasks.length,
                }, null,2));
            } catch (err)  {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Invalid JSON format' }))
            }
           });
    }
    else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
        const id = parseInt(req.url.split('/')[2]);
        const task = tasks.find(t => t.id === id);

        if (!task) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Task not found' }));
        }

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end',  () => {
            try {
                const updatedTask = JSON.parse(body);

                if (updatedTask.title !== undefined) {
                    task.title = updatedTask.title.trim();
                }
                if (updatedTask.completed !== undefined) {
                    task.completed = updatedTask.completed;
                }
                res.statusCode = 200;
                res.end(JSON.stringify({
                    messsage : `Task ${id} updated successfully`,
                    updatedTask : task
                
                }));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON format' }))
            }                                                       
    })
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
        const id = parseInt(req.url.split('/')[2]);
        const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Task not found' }));
    } else {

        const deletedTask = tasks.splice(taskIndex, 1)[0];
        res.statusCode = 200;
        res.end(JSON.stringify({
            message : `Task ${id} deleted successfully`,
            deletedTask,
            remainingTasks : tasks.length
        }, null,2));
    }
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            error : 'Route not found please check the URL and try again !'
        }));
        }
    });

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})

