const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_department',function(req,res){
    const sql = "SELECT * FROM department";
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_department',function(req,res){
    const department = req.body.department;
    const sql = "INSERT INTO department (department_id,department_name) VALUES ((SELECT CAST(get_id('department','department_id') AS INT )),'"+department+"')";
    pool.query(sql, (qur_err, qur_res) => {
        //res.json(qur_res);
        if(qur_err){
           res.send("erroe");
        }else{
           res.send("ok");
        }
    })
    
});

router.post('/delete_department',function(req,res){
    const id = req.body.id;
    const sql = "DELETE FROM department WHERE department_id ="+id;
    pool.query(sql, (qur_err, qur_res) => {
        //res.json(qur_res);
        if(qur_err){
           res.send("erroe");
        }else{
           res.send("ok");
        }
    })
});

router.post('/update_department',function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const sql = "UPDATE department SET department_name = '"+name+"' WHERE department_id ="+id+"";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
           res.send("error");
        }else{
           res.send("ok");
        }
    })
});

module.exports = router;