const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_business_type',function(req,res){
    const sql = "SELECT * FROM business_type";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_business_type',function(req,res){
    const business_type = req.body.business_type;
    const sql = "INSERT INTO business_type (business_type_id,business_type_name) VALUES ((SELECT CAST(get_id('business_type','business_type_id') AS INT )),'"+business_type+"')";
    pool.query(sql, (qur_err, qur_res) => {
        //res.json(qur_res);
        if(qur_err){
           res.send("erroe");
        }else{
           res.send("ok");
        }
    })
    
});

router.post('/delete_business_type',function(req,res){
    const id = req.body.id;
    const sql = "DELETE FROM business_type WHERE business_type_id ="+id;
    pool.query(sql, (qur_err, qur_res) => {
        //res.json(qur_res);
        if(qur_err){
           res.send("erroe");
        }else{
           res.send("ok");
        }
    })
});

router.post('/update_business_type',function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const sql = "UPDATE business_type SET business_type_name = '"+name+"' WHERE business_type_id ="+id+"";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
           res.send("error");
        }else{
           res.send("ok");
        }
    })
});

module.exports = router;