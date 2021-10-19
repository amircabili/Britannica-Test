const mongoose = require('mongoose')

const db = "mongodb://localhost:27017/britannicaDB"


mongoose.connect(db, err=>{
    if(err){
        console.error('Error! ' + err)
    } else {
        console.error('Connected to mongo britannica DB Yes!')
    }
})

