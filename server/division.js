const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_division',function(req,res){
    const sql = "SELECT * FROM division AS dv LEFT JOIN department AS dp ON dv.department_id = dp.department_id";
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_division',function(req,res){
    const division_name = req.body.division_name;
    const department_id = req.body.department_id;
    const sql = "INSERT INTO division (division_id,division_name,department_id) VALUES ((SELECT CAST(get_id('division','division_id') AS INT )),'"+division_name+"',"+department_id+")";
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.send("error");
        }else{
            res.send(qur_res.rows);
        }
    })
});

router.post('/delete_division',function(req,res){
    const division_id = req.body.division_id;
    const sql = "DELETE FROM division WHERE division_id = "+division_id;
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.send("error");
        }else{
            res.send(qur_res.rows);
        }
    })
});

router.post('/update_division',function(req,res){
    const division_id = req.body.division_id;
    const division_name = req.body.division_name;
    const department_id = req.body.department_id;
    const sql = "UPDATE division SET division_name = '"+division_name+"', department_id = "+department_id+" WHERE division_id ="+division_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.send("error");
        }else{
            res.send(qur_res.rows);
        }
    })
});

module.exports = router;