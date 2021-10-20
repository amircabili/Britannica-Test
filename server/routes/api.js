const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/userModel')

const noteBL = require('../models/noteBL')


function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


router.get('/', (req, res) => {
    res.send('Hello from API route !!')
})


router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})


router.post('/login', (req, res) => {
    let userData = req.body
    //let user = new User(userData)
    User.findOne({email: userData.email}, (error,user) => {
        if (error) {
            console.log(error )
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if(user.password !== userData.password){
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})


router.get('/user',verifyToken,async (req, res)=> {

    let notes = await noteBL.getNotes();
    return res.json(notes)

})

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await noteBL.createNote(obj);
        return resp.json(status)
    })


router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let status = await noteBL.updateNote(id,obj);
        return resp.json(status)
    })


router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let status = await noteBL.deleteNote(id);
        return resp.json(status)
    })

module.exports = router
