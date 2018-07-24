const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_staff',function(req,res){
    const sql = "SELECT em.employee_id,em.first_name,em.last_name,em.employee_code,dv.division_name,dm.department_name,ps.position_name FROM employee AS em "+
                "LEFT JOIN division AS dv ON em.division_id = dv.division_id "+
                "LEFT JOIN department AS dm ON dv.department_id = dm.department_id "+
                "LEFT JOIN position AS ps ON em.position_id = ps.position_id";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_staff',function(req,res){
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const employee_code = req.body.employee_code;
    const division_id = req.body.division_id;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const position_id = req.body.position_id;
    
    const sql = "INSERT INTO employee (employee_id,first_name,last_name,employee_code,division_id,address,phone_number,email,username,password,position_id) "+
                "VALUES ((SELECT CAST(get_id('employee','employee_id') AS INT )) ,'"+first_name+"','"+last_name+"',"+
                "'"+employee_code+"','"+division_id+"','"+address+"','"+phone_number+"','"+email+"','"+username+"',"+
                "'"+password+"','"+position_id+"')";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_staff',function(req,res){
    const employee_id = req.body.employee_id;
    const sql = "DELETE FROM employee WHERE employee_id = "+employee_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_staff_by_id',function(req,res){
    
    const employee_id = req.body.employee_id;

    const sql = "SELECT * FROM employee AS em "+//em.employee_id,em.username,em.password,em.first_name,em.last_name,em.employee_code,dv.division_name,dm.department_name,ps.position_name
                "LEFT JOIN division AS dv ON em.division_id = dv.division_id "+
                "LEFT JOIN department AS dm ON dv.department_id = dm.department_id "+
                "LEFT JOIN position AS ps ON em.position_id = ps.position_id" +
                " WHERE em.employee_id = "+employee_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_staff',function(req,res){
    
    const employee_id = req.body.employee_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const employee_code = req.body.employee_code;
    const division_id = req.body.division_id;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const position_id = req.body.position_id;

    const sql = "UPDATE employee SET first_name = '"+first_name+
                "', last_name = '"+ last_name+"', employee_code = '"+employee_code+
                "', division_id = '"+division_id+
                "', address = '"+address+"', phone_number = '"+phone_number+
                "', email = '"+email+ "', username = '"+username+
                "', password = '"+password+"', position_id = '"+position_id+"' WHERE employee_id = '"+employee_id+"'";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});



module.exports = router;