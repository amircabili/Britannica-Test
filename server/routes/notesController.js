const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();
const User = require('../models/userModel')
const noteBL = require('../models/noteBL')


function verifyTokenAndUser(req, res, next){
     //Get the real secret key from db or envinroment variable..
     const RSA_PRIVATE_KEY = 'somekey';

    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, RSA_PRIVATE_KEY, function(err, data) 
    {
        console.log(data)
        if (err) 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        //res.status(200).send(decoded);
        //res.status(200).send([{name : 'car'},{name : 'phone'}]);
        console.log('Token is ok !!')
        next()
    });
    
}


 router.get('/',verifyTokenAndUser,async (req, res)=> {
    let notes = await noteBL.getNotes();
    return res.json(notes)
})

 
  
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error )
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if(user.password !== userData.password){
                res.status(401).send('Invalid password')
            } else {
        
                const RSA_PRIVATE_KEY = 'somekey';
                var token = jwt.sign({ id: registeredUser._id },
                                     RSA_PRIVATE_KEY,
                                    {expiresIn: 7200  } // expires in 2 hours
                                    );
                res.status(200).send({  token: token });

           }
        }

    })
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
