const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/add_approve',function(req,res){
    var requirement_id = req.body.requirement_id;
    var expected_to_take = req.body.expected_to_take;
    var expenses = req.body.expenses;
    var endorser = req.body.endorser;
    var approval_results = req.body.approval_results;
    var detail = req.body.detail;
    var date_of_permit = req.body.date_of_permit
    const sql = "INSERT INTO permit (permit_id,requirement_id,expected_to_take,expenses,endorser,approval_results,detail,date_of_permit) VALUES "+
                "((SELECT CAST(get_id('permit','permit_id') AS INT )),"+requirement_id+","+expected_to_take+", "+
                ""+expenses+","+endorser+","+approval_results+",'"+detail+"','"+date_of_permit+"')";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("insert permit error");
        }else{
            res.json('ok');
        }
    })
});

router.post('/show_approve',function(req,res){
   
    const sql = "SELECT * FROM permit AS p "+
                "LEFT JOIN requirement AS re ON p.requirement_id = re.requirement_id "+
                "LEFT JOIN customer AS cm ON re.customer_id = cm.customer_id "+
                "LEFT JOIN employee AS em ON p.endorser = em.employee_id "+
                "LEFT JOIN requirement_status AS res ON re.status = res.requirement_status_id ORDER BY date_of_permit ASC";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_approve_by_id',function(req,res){
   var permit_id = req.body.premit_id;
   //console.log(permit_id);
    const sql = "SELECT * FROM permit WHERE permit_id = "+permit_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_approve',function(req,res){
    var permit_id = req.body.permit_id;
    var requirement_id = req.body.requirement_id;
    var expected_to_take = req.body.expected_to_take;
    var expenses = req.body.expenses;
    var endorser = req.body.endorser;
    var approval_results = req.body.approval_results;
    var detail = req.body.detail;
    var date_of_permit = req.body.date_of_permit
    const sql = "UPDATE permit SET requirement_id = "+requirement_id+","+
                "expected_to_take = '"+expected_to_take+"', expenses ='"+expenses+"',"+
                "endorser = '"+endorser+"', approval_results ='"+approval_results+"',"+
                "detail = '"+detail+"',date_of_permit = '"+date_of_permit+"' "+
                "WHERE permit_id = "+permit_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("insert permit error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;