const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const PORT = 4002

const app = express();
require('./configs/database');
app.use(cors())

app.use(bodyParser.json());

const authController = require('./routes/authController');
const notesController = require('./routes/notesController');

// localhost:4002/api/auth/login
app.use('/api/auth', authController);

// localhost:4002/api/products
app.use('/api/notes', notesController);

// app.listen(4002)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res){
    res.send('Hello from server Yess!!')
})

app.listen(PORT, function(){
    console.log('Server running on localhost!:' + PORT)
})




//////////////////////////////////////////////////////////////////////////////////



// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const PORT = 3000

// const api = require('./routes/api')

// const app = express()

// require('./configs/database');

// app.use(cors( ))

// app.use(bodyParser.json( ))

// app.use('/api',api)



// app.get('/', function(req, res){
//     res.send('Hello from server Yess!!')
// })

// app.listen(PORT, function(){
//     console.log('Server running on localhost!:' + PORT)
// })



