const express = require('express');
const router = express.Router();

router.get('/show',function(req,res){
    res.end('Hi I am API ..!');
})

// router.use('/login',function(req,res){
//     const data = {
//         username:req.body.username,
//         password:req.body.password
//     }
//     res.json(data);
// })


router.use('/lang',function(req,res){
    const lang = require('./language.js');
    res.json(lang);
})


module.exports = router;