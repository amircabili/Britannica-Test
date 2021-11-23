const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();
const User = require('../models/userModel')
  
router.post('/login', function(req, res) {
    let userData = req.body
    console.log('userData - ' + JSON.stringify(userData.email))
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
 
                const RSA_PRIVATE_KEY = 'somekey';
                var token = jwt.sign({ id: user._id },
                                     RSA_PRIVATE_KEY,
                                    {expiresIn: 7200  } // expires in 2 hours
                                    );
                res.status(200).send({  token: token });

           }
        }
    })
})

  module.exports = router;
