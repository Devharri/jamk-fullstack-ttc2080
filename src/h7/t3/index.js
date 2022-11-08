const { json } = require('express');
const express = require('express')
const fs = require('fs');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

// use mongoose
const mongoose = require('mongoose')

// connection string - EDIT YOUR OWN HERE
const mongoDB = 'mongodb+srv://USER:PASSWORD@cluster0.twe4v.mongodb.net/?retryWrites=true&w=majority'

// connect mongodb
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// check connection - ok or error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Database test connected")
})

// new schema
const userSchema = new mongoose.Schema({
    name: String
})

// new model
const User = mongoose.model('User', userSchema, 'users')

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
app.get('/users', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

// get one user
app.get('/users/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) response.json(user)
    else response.status(404).end()
  })

// create a new user
app.post('/users', async (request, response) => {
    // Get name from request
    const { name } = request.body
  
    // Create a new user
    const user = new User({
      name: name
    })
  
    // Save to db and send back to caller
    const savedUser = await user.save()
    response.json(savedUser)  
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
app.delete('/users/:id', async (request, response) => {
    const deletedUser = await User.findByIdAndRemove(request.params.id)
    if (deletedUser) response.json(deletedUser)
    else response.status(404).end()
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

// let users =
//     [
//         { 'id': '1', 'name': 'Kirsi Kernel' },
//         { 'id': '2', 'name': 'Matti Mainio' }
//     ]