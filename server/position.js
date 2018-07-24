const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/add_position',function(req,res){
    const position_name = req.body.position_name;
    const sql = "INSERT INTO position (position_id,position_name) VALUES ((SELECT CAST(get_id('position','position_id') AS INT )),'"+position_name+"')";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_position',function(req,res){
    const sql = "SELECT * FROM position";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_position',function(req,res){
    const position_id = req.body.position_id;
    const sql = "DELETE FROM position WHERE position_id = "+position_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_position',function(req,res){
    const position_id = req.body.position_id;
    const position_name = req.body.position_name;
    const sql = "UPDATE position SET position_name = '"+position_name+"' WHERE position_id = "+position_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;