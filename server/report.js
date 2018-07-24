const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/repoet_performance',function(req,res){
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT em.employee_id,em.first_name,em.last_name,t.count AS total_task,r.count AS reject_task,s.count AS sucess_task,p.count AS process_task "+
    "FROM employee AS em LEFT JOIN "+
    "(SELECT COUNT(*),operator FROM sub_task LEFT JOIN task ON task.task_id = sub_task.task_id WHERE task.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' GROUP BY operator) AS t ON em.employee_id = t.operator LEFT JOIN "+
    "(SELECT COUNT(*),operator FROM sub_task LEFT JOIN task ON task.task_id = sub_task.task_id WHERE task.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' AND test_result = FALSE GROUP BY operator) AS r ON em.employee_id = r.operator LEFT JOIN "+
    "(SELECT COUNT(*),operator FROM sub_task LEFT JOIN task ON task.task_id = sub_task.task_id WHERE task.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' AND test_result = TRUE GROUP BY operator) AS s ON em.employee_id = s.operator LEFT JOIN "+
    "(SELECT COUNT(*),operator FROM sub_task LEFT JOIN task ON task.task_id = sub_task.task_id WHERE task.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' AND test_result IS NULL GROUP BY operator) AS p ON em.employee_id = p.operator "+
    "LEFT JOIN sub_task AS st ON em.employee_id = st.operator "+
    "LEFT JOIN task ON st.task_id = task.task_id "+
    "GROUP BY em.employee_id,t.count,r.count,s.count,em.first_name,em.last_name,p.count";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_sub_task_by_employee_id',function(req,res){
    const employee_id = req.body.employee_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT * FROM sub_task AS st "+
                "LEFT JOIN task AS t ON st.task_id = t.task_id "+
                "WHERE st.operator = "+employee_id+" AND t.import_date BETWEEN '"+start_date+"' AND '"+end_date+"'";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/report_task_by_period',function(req,res){
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT re.program_name,em.first_name,em.last_name,ts.task_status_name,c.company_name,t.import_date,t.deadline FROM task AS t "+ 
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN employee AS em ON t.primary_responsibility = em.employee_id "+
                "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
                "LEFT JOIN customer AS c ON re.customer_id = c.customer_id "+
                "WHERE t.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' ORDER BY t.import_date ASC";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/report_track',function(req,res){
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT t.task_id,"+
    "(CASE WHEN (SELECT MIN(st.actual_start_date)FROM sub_task AS st WHERE t.task_id = st.task_id) IS NOT NULL "+
    "THEN (SELECT MIN(st.actual_start_date)FROM sub_task AS st WHERE t.task_id = st.task_id) > t.expect_start_date "+
    "ELSE t.expect_start_date < current_date END) AS follow,t.expect_start_date,"+
    "(SELECT MIN(st.actual_start_date)FROM sub_task AS st WHERE t.task_id = st.task_id),re.program_name,ts.task_status_name,"+
    "em.first_name,em.last_name "+
    "FROM task AS t "+
    "LEFT JOIN requirement AS re ON re.requirement_id = t.requirement_id "+
    "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
    "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
    "WHERE t.import_date BETWEEN '"+start_date+"' AND '"+end_date+"' AND t.status <> 6 ORDER BY follow DESC";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/report_requirement',function(req,res){
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT c.customer_id,c.company_name,(SELECT COUNT(*) FROM requirement WHERE customer_id = c.customer_id AND date_of_notification BETWEEN '"+start_date+"' AND '"+end_date+"') AS all_re,"+
                "(SELECT COUNT(*) FROM requirement WHERE status = 5 AND customer_id = c.customer_id AND date_of_notification BETWEEN '"+start_date+"' AND '"+end_date+"') AS finish,"+
                "(SELECT COUNT(*) FROM requirement WHERE status <> 5 AND customer_id = c.customer_id AND date_of_notification BETWEEN '"+start_date+"' AND '"+end_date+"') AS process FROM customer AS c "+
                "LEFT JOIN requirement AS re ON re.customer_id = c.customer_id "+
                
                "GROUP BY c.customer_id";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_requirement_by_customer_id',function(req,res){
    const customer_id = req.body.customer_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const sql = "SELECT * FROM requirement WHERE customer_id = "+customer_id+" AND date_of_notification BETWEEN '"+start_date+"' AND '"+end_date+"' ";
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