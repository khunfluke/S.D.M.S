const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_testing',function(req,res){
    const sql = "SELECT * FROM test AS te "+
                "LEFT JOIN task AS ta ON te.task_id = ta.task_id "+
                "LEFT JOIN employee AS em ON te.tester = em.employee_id "+
                "LEFT JOIN requirement AS re ON ta.requirement_id = re.requirement_id";                
                //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {    
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_testing_by_update',function(req,res){
    var test_id = req.body.test_id;
    const sql = "SELECT te.file AS te_file , * FROM test AS te "+
                "LEFT JOIN task AS ta ON te.task_id = ta.task_id "+
                "LEFT JOIN requirement AS re ON ta.requirement_id = re.requirement_id "+
                "WHERE te.test_id = "+test_id;                
                // res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {    
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_testing',function(req,res){
    const task_id = req.body. task_id;
    const test_no = req.body.test_no;
    const date_test = req.body.date_test;
    const tester = req.body.tester;
    const description = req.body.description;
    const file = req.body.file;
    const sql = "INSERT INTO test (test_id,task_id,test_no,date_test,tester,description,file)" +
                "VALUES ((SELECT CAST(get_id('test','test_id') AS INT ))"+
                ",'"+task_id+"','"+test_no+"','"+date_test+"','"+tester+"','"+description+"','"+file+"') RETURNING *";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
       // res.json(qur_res);
        if(qur_err){
           res.json("erroe");
        }else{
            res.json(qur_res.rows);
        }
    })
})

router.post('/upload_file_testing',function(req,res){
    const id = req.body.id;
    const file = req.body.file;
    const sql = "UPDATE test SET file = '"+file+"' WHERE test_id = "+id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_testing',function(req,res){
    const test_id = req.body.test_id;
    const task_id = req.body.task_id;
    const test_no = req.body.test_no;
    const date_test = req.body.date_test;
    const tester = req.body.tester;
    const description = req.body.description;
        const sql = "UPDATE test SET "+
                    "task_id = '"+task_id+"', test_no = '"+test_no+"', "+
                    "date_test = '"+date_test+"', "+
                    "tester = '"+tester+"', "+
                    "description = '"+description+"' "+
                    "WHERE test_id = "+test_id+" RETURNING *" ;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_testing',function(req,res){
    const test_id = req.body.test_id;
    const sql = "DELETE FROM test WHERE test_id = "+test_id+" RETURNING *";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

module.exports = router;