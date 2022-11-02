const { json } = require('express');
const express = require('express')
const fs = require('fs');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

// create logger
const logger = (request, response, next) => {
    const date = new Date()
    const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const log = `${lDate}: ${request.method} ${request.url}\n`
    console.log(log)

    const content = log;
    fs.appendFile('log.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
    next()
}

// use own made logger middleware in express app
app.use(logger)

// get all users
app.get('/users', (request, response) => {
    response.json(users)
})

// get one user
app.get('/users/:id', (request, response) => {
    // const id = request.params.id
    const { id } = request.params
    const user = users.find(user => user.id === id)
    // check if user exists or return 404
    if (user) response.json(user)
    else response.status(404).end()
})

// create a new user
app.post('/users/', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.id = (maxId + 1).toString()
    users = users.concat(user)
    response.json(user)
})

// update user data
app.put('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    // const name = request.query.name
    const { name } = request.query
    const user = users.find(user => user.id === id)
    if (user) {
        user.name = name
        response.status(200).end()
    } else {
        response.status(204).end()
    }
})

// delete one user
app.delete('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    users = users.filter(user => user.id !== id)
    // Just send "204 no content" status code back
    response.status(204).end()
})

// Adduser form for one user
app.get('/adduser', (request, response) => {
    htmlform = `
    <a href="/adduser">Add user</a> <a href="/showusers">Show users</a>
    <hr>
    <form action=/adduser method=post>
    Add a new user: <input type=text name=nimi><br>
    <input type=submit value="add user">
    </form>
  `;
    response.send(htmlform)
})

// Adduser form for one user
app.post('/adduser', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.name = request.body.nimi
    user.id = (maxId + 1).toString()
    users = users.concat(user)
    response.redirect('/showusers')
})

// Adduser form for one user
app.get('/showusers', (request, response) => {
    let htmlform = '<a href="/adduser">Add user</a> <a href="/showusers">Show users</a><hr><table><tr><th>Id</th><th>Name</th></tr>';

    for (let i = 0; i < users.length; i++) {
        htmlform = htmlform.concat("<tr><td>")
        htmlform = htmlform.concat(users[i].id)
        htmlform = htmlform.concat("</td><td>")
        htmlform = htmlform.concat(users[i].name)
        htmlform = htmlform.concat("</td></tr>")
    };

    htmlform = htmlform.concat("</table>");

    response.send(htmlform)
})

app.listen(port, () => {
    console.log('Example app listening on port 3000')
})

let users =
    [
        { 'id': '1', 'name': 'Kirsi Kernel' },
        { 'id': '2', 'name': 'Matti Mainio' }
    ]