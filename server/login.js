const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');


router.post('/check_login',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const sql = "SELECT * FROM employee WHERE username = '"+username+"' AND password = '"+password+"'";
    pool.query(sql, (qur_err, qur_res) => {
        res.json(qur_res.rows);
    })

})

module.exports = router;