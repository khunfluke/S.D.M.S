const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');
const formidable = require('formidable');
const fs = require('fs')

router.post('/show_requirement',function(req,res){
    const sql = "SELECT * FROM requirement AS re "+
                "LEFT JOIN customer AS cm ON re.customer_id = cm.customer_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "LEFT JOIN requirement_status AS res ON re.status = res.requirement_status_id";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_requirement',function(req,res){
    const program_name = req.body.program_name;
    const version = req.body.version;
    const want = req.body.want;
    const requirement = req.body.detail;
    const file = req.body.document;
    const customer_id = req.body.company_id;
    const recipient = req.body.employee_id;
    const program_support = req.body.program_support;
    const date_of_notification = req.body.date_of_notification;
    const requirement_no = req.body.requirement_no;
    const sql = "INSERT INTO requirement (requirement_id,program_name,version,requirement_no,requirement,status,file,customer_id,recipient,program_support,date_of_notification,want) VALUES"+
                " ((SELECT CAST(get_id('requirement','requirement_id') AS INT )),'"+program_name+"',"+
                ""+version+",'"+requirement_no+"','"+requirement+"',1,'',"+customer_id+","+
                ""+recipient+",'"+program_support+"','"+date_of_notification+"','"+want+"') RETURNING *";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/upload_file',function(req,res){
    const id = req.body.id;
    const file = req.body.file;
    const sql = "UPDATE requirement SET file = '"+file+"' WHERE requirement_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_requirement_by_id',function(req,res){
    const id = req.body.id;
    const sql = "SELECT cm.phone_number AS c_phone_number,* FROM requirement AS re "+
                "LEFT JOIN customer AS cm ON re.customer_id = cm.customer_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "LEFT JOIN division AS dv ON dv.division_id = em.division_id "+
                "LEFT JOIN department AS dp ON dv.department_id = dp.department_id "+
                "LEFT JOIN requirement_status AS res ON re.status = res.requirement_status_id "+
                "WHERE requirement_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_status',function(req,res){
    const id = req.body.requirement_id;
    const status = req.body.status;
    const sql = "UPDATE requirement SET status = "+status+" WHERE requirement_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_requirement',function(req,res){
    const require_id = req.body.require_id;
    const program_name = req.body.program_name;
    const version = req.body.version;
    const want = req.body.want;
    const requirement = req.body.detail;
    const file = req.body.document;
    const customer_id = req.body.company_id;
    const recipient = req.body.employee_id;
    const program_support = req.body.program_support;
    const date_of_notification = req.body.date_of_notification;
    const requirement_no = req.body.requirement_no;
    const sql = "UPDATE requirement SET "+
                "program_name = '"+program_name+"', version = '"+version+"', "+
                "requirement_no = '"+requirement_no+"', requirement = '"+requirement+"', "+
                "status = 1, customer_id = "+customer_id+", "+
                "recipient = "+recipient+", program_support = '"+program_support+"', "+
                "date_of_notification = '"+date_of_notification+"', want = '"+want+"' "+
                "WHERE requirement_id = "+require_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_requirement',function(req,res){
    const requirement_id = req.body.requirement_id;
    const sql = "DELETE FROM requirement WHERE requirement_id = "+requirement_id+" RETURNING *";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_requirement_by_approve',function(req,res){
    const requirement_id = req.body.requirement_id;
    const sql = "SELECT cm.phone_number AS c_phone_number,* FROM requirement AS re "+
                "LEFT JOIN customer AS cm ON re.customer_id = cm.customer_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "LEFT JOIN division AS dv ON dv.division_id = em.division_id "+
                "LEFT JOIN department AS dp ON dv.department_id = dp.department_id "+
                "LEFT JOIN requirement_status AS res ON re.status = res.requirement_status_id "+
                "WHERE status = 1 ORDER BY re.date_of_notification ASC";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_requirement_by_import_development',function(req,res){
    const requirement_id = req.body.requirement_id;
    const sql = "SELECT * FROM requirement AS re "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "WHERE re.requirement_id = "+requirement_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_max_requirement_id',function(req,res){
    const requirement_id = req.body.requirement_id;
    const sql = "SELECT CAST(get_id('requirement','requirement_id') AS INT)";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;