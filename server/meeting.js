const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_meeting',function(req,res){
    const sql = "SELECT * FROM meeting";
    pool.query(sql, (qur_err, qur_res) => {    
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_meeting_by_id',function(req,res){
    const id = req.body.id;
    const sql = "SELECT * FROM meeting AS em "+
                "LEFT JOIN attendees AS dv ON em.meeting_id = dv.meeting_id "+
                " WHERE em.meeting_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_attendees_by_id',function(req,res){
    const id = req.body.id;
    const sql = "SELECT * FROM attendees AS em "+
                " WHERE em.meeting_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_meeting',function(req,res){
    const conference_topics = req.body.conference_topics;
    const meeting_no = req.body.meeting_no;
    const meeting_date = req.body.meeting_date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const place = req.body.place;
    const description = req.body.description;
    const file = req.body.file;
    const secretary = req.body.secretary;
    const sql = "INSERT INTO meeting (meeting_id,conference_topics,meeting_no,meeting_date,start_time,end_time,place,description,file,secretary)" +
                "VALUES ((SELECT CAST(get_id('meeting','meeting_id') AS INT ))"+
                ",'"+conference_topics+"','"+meeting_no+"','"+meeting_date+"','"+start_time+"','"+end_time+"','"+place+"','"+description+"','"+file+"','"+secretary+"') RETURNING *";
               // res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
       // res.json(qur_res);
        if(qur_err){
           res.json("erroe");
        }else{
            res.json(qur_res.rows);
        }
    })
})
    
router.post('/update_file',function(req,res){
    const id = req.body.id;
    const file = req.body.file;
    const sql = "UPDATE meeting SET file = '"+file+"' WHERE meeting_id = '"+id+"' ";

    pool.query(sql, (qur_err, qur_res) => {
       // res.json(qur_res);
        if(qur_err){
           res.json("erroe");
        }else{
            res.json(qur_res.rows);
        }
    })
    
})

router.post('/delete_meeting',function(req,res){
    const meeting_id = req.body.meeting_id;
    const sql = "DELETE FROM meeting WHERE meeting_id = "+meeting_id+" RETURNING *";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_meeting',function(req,res){
    const meeting_id = req.body.meeting_id;
    const conference_topics = req.body.conference_topics;
    const meeting_no = req.body.meeting_no;
    const meeting_date = req.body.meeting_date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const place = req.body.place;
    const description = req.body.description;
    const file = req.body.file;
    const secretary = req.body.secretary;
    const sql = "UPDATE meeting SET "+
                "conference_topics = '"+conference_topics+"', meeting_no = '"+meeting_no+"', "+
                "meeting_date = '"+meeting_date+"', start_time = '"+start_time+"', "+
                "end_time = '"+end_time+"', place = '"+place+"', "+
                "description = '"+description+"', "+
                "secretary = '"+secretary+"' "+
                "WHERE meeting_id = "+meeting_id+"RETURNING *" ;
   // res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;