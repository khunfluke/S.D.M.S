const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/add_attendeesinto',function(req,res){
    const employee_id = req.body.employee_id;
    const meeting_id = req.body.meeting_id;
    var sql = "INSERT INTO attendees (attendees_id, employee_id,meeting_id) VALUES ";
    var index = 1;
    for(var i=0;i<employee_id.length;i++){
        index += i;
        if(i !== (employee_id.length-1) ){
            sql += "((SELECT CAST(get_id('attendees','attendees_id') AS INT )),'"+employee_id[i]+"','"+meeting_id+"'), ";
        } else{
            sql += "((SELECT CAST(get_id('attendees','attendees_id') AS INT )),'"+employee_id[i]+"','"+meeting_id+"') ";    
        } 
    }
              pool.query(sql, (qur_err, qur_res) => {
            if(qur_err){
                res.json(qur_err);
             }else{
                res.json(qur_res.rows);
             }
        })
});

router.post('/delete_attendees',function(req,res){
    const meeting_id = req.body.meeting_id;
    const sql = "DELETE FROM attendees WHERE meeting_id = "+meeting_id+" RETURNING *";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;