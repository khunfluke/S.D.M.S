const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_task_status',function(req,res){

    const sql = "SELECT * FROM task_status ORDER BY task_status_id";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_requirement_by_open_task',function(req,res){

    const sql = "SELECT re.requirement_id,re.program_name,s.requirement_status_name,re.date_of_notification,null AS task_id FROM requirement AS re "+
                "LEFT JOIN requirement_status AS s ON s.requirement_status_id = re.status "+
                "WHERE re.status = 2 UNION ALL "+
                "SELECT re.requirement_id,re.program_name,ts.task_status_name,te.date_test,t.task_id FROM task AS t "+
                "LEFT JOIN requirement AS re ON re.requirement_id = t.requirement_id "+
                "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
                "LEFT JOIN test AS te ON te.task_id = t.task_id "+
                "WHERE t.status = 5";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_task',function(req,res){
    var requirement_id = req.body.requirement_id
    var status = req.body.status
    var import_date = req.body.import_date
    var expect_start_date = req.body.expect_start_date
    var expect_end_date = req.body.expect_end_date
    var deadline = req.body.deadline
    var primary_responsibility = req.body.primary_responsibility
    var difficulty_level = req.body.difficulty_level
    const sql = "INSERT INTO task (task_id,import_date,expect_start_date,expect_end_date,deadline,primary_responsibility,status,requirement_id,difficulty_level) VALUES "+
                "((SELECT CAST(get_id('task','task_id') AS INT )),'"+import_date+"', "+
                "'"+expect_start_date+"','"+expect_end_date+"','"+deadline+"','"+primary_responsibility+"',"+status+","+requirement_id+",'"+difficulty_level+"') RETURNING *";
    //res.send(sql);    
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_sub_task',function(req,res){
    var sub_task = req.body.sub_task;
    var task_id = req.body.task_id;
    var sql = "INSERT INTO sub_task (sub_task_id,sub_task_name,difficulty_level,task_id) VALUES ";
    
    var index = 1;
    for(var i=0;i<sub_task.length;i++){
        index += i;
        if(i < (sub_task.length-1)){
            sql += "((SELECT CAST(get_id('sub_task','sub_task_id') AS INT )),'"+sub_task[i].sub_task_name+"','"+sub_task[i].difficulty_level+"',"+task_id+"),";
        }else{
            sql += "((SELECT CAST(get_id('sub_task','sub_task_id') AS INT )),'"+sub_task[i].sub_task_name+"','"+sub_task[i].difficulty_level+"',"+task_id+")";
        }
        
    }

    //res.send(sql);    
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task',function(req,res){

    const sql = "SELECT * FROM task AS t "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
                "LEFT JOIN employee AS e ON e.employee_id = re.recipient";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_by_reject',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT *,t.expect_start_date AS t_expect_start_date,t.expect_end_date AS t_expect_end_date FROM task AS t "+
                "LEFT JOIN sub_task AS st ON t.task_id = st.task_id "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "WHERE t.task_id = "+task_id +" AND st.test_result = false";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_by_update',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT *,t.expect_start_date AS t_expect_start_date,t.expect_end_date AS t_expect_end_date,t.difficulty_level AS t_difficulty_level FROM task AS t "+
                "LEFT JOIN sub_task AS st ON t.task_id = st.task_id "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN task_status AS ts ON t.status = ts.task_status_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "WHERE t.task_id = "+task_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_status_task',function(req,res){
    var task_id = req.body.task_id;
    var status = req.body.status;
    const sql = "UPDATE task SET status = "+status+" WHERE task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_task',function(req,res){
    var task_id = req.body.task_id;
    const sql = "DELETE FROM task WHERE task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_id_by_delete_reject',function(req,res){
    var requirement_id = req.body.requirement_id;
    var task_id = req.body.task_id;
    const sql = "SELECT MAX(task_id) AS max_task_id FROM task WHERE requirement_id = "+requirement_id+" AND task_id <> "+task_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_task',function(req,res){
    var task_id = req.body.task_id
    var requirement_id = req.body.requirement_id
    var status = req.body.status
    var import_date = req.body.import_date
    var expect_start_date = req.body.expect_start_date
    var expect_end_date = req.body.expect_end_date
    var deadline = req.body.deadline
    var primary_responsibility = req.body.primary_responsibility
    var difficulty_level = req.body.difficulty_level
    const sql = "UPDATE task SET requirement_id ="+requirement_id+","+
                "status = "+status+", import_date ='"+import_date+"', "+
                "expect_start_date = '"+expect_start_date+"', expect_end_date ='"+expect_end_date+"', "+
                "deadline = '"+deadline+"', primary_responsibility ="+primary_responsibility+" ,"+
                "difficulty_level = '"+difficulty_level+"' WHERE task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_sub_task_by_task_id',function(req,res){
    var task_id = req.body.task_id;
    const sql = "DELETE FROM sub_task WHERE task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_by_add_plan',function(req,res){

    const sql = "SELECT * FROM task AS t "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "WHERE t.status = 1 OR t.status = 7";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_sub_task_by_add_plan',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT * FROM sub_task AS st WHERE st.task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_sub_task_by_update_plan',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT *,st.expect_start_date AS st_expect_start_date,st.expect_end_date AS st_expect_end_date  FROM sub_task AS st "+
                "LEFT JOIN task AS t ON t.task_id = st.task_id "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "WHERE st.task_id = "+task_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_plan',function(req,res){
    var sub_task = req.body.sub_task;
    var sql = "";
    for(var i=0;i<sub_task.length;i++){
        if(sub_task[i].previous_task == ''){
            sub_task[i].previous_task = null;
        }
        sql += "UPDATE sub_task SET previous_task = "+sub_task[i].previous_task+", "+
                "operator = "+sub_task[i].operator+", expect_start_date = '"+sub_task[i].expect_start_date+"', "+
                "expect_end_date = '"+sub_task[i].expect_end_date +"' WHERE sub_task_id = "+sub_task[i].sub_task_id+";";
    }
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_by_status',function(req,res){
    var status = req.body.status;
    const sql = "SELECT * FROM task AS t "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "WHERE t.status = "+status;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_task_by_status_progress',function(req,res){
    var status = req.body.status;
    var progress = req.body.progress;
    const sql = "SELECT * FROM task AS t "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN employee AS em ON re.recipient = em.employee_id "+
                "WHERE t.status = "+status+" "+
                "AND t.progress = "+progress;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_plan',function(req,res){
    var task_id = req.body.task_id;
    var requirement_id = req.body.requirement_id
    var sql =  "UPDATE sub_task SET previous_task = null, "+
                "operator = null, expect_start_date = null, "+
                "expect_end_date = null WHERE task_id = "+task_id+";"+
                "SELECT count(requirement_id) FROM task WHERE requirement_id = "+requirement_id+";";
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_sub_task_by_employee_id',function(req,res){
    var employee_id = req.body.employee_id;
    const sql = "SELECT * FROM sub_task WHERE operator ="+employee_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_sub_task_by_task_id',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT *,st.progress AS progress,t.progress AS t_progress,st.expect_start_date AS st_expect_start_date,st.expect_end_date AS st_expect_end_date,st.actual_start_date AS st_actual_start_date,st.actual_end_date AS st_actual_end_date "+
                "FROM sub_task AS st "+
                "LEFT JOIN task AS t ON t.task_id = st.task_id "+
                "LEFT JOIN requirement AS re ON t.requirement_id = re.requirement_id "+
                "LEFT JOIN employee AS em ON st.operator = em.employee_id "+
                "WHERE st.task_id = "+task_id;
                //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_develop',function(req,res){
    var sub_task = req.body.sub_task;
    var sql = "";
    var progress;
    var sub_task_progress = 0;
    for(var i=0;i<sub_task.length;i++){
        sub_task_progress += sub_task[i].progress;
        sql += "UPDATE sub_task SET actual_start_date = '"+sub_task[i].actual_start_date +"', "+
                "actual_end_date = '"+sub_task[i].actual_end_date +"', progress = "+sub_task[i].progress +" "+
                "WHERE sub_task_id = "+sub_task[i].sub_task_id+";";
    }
    progress = sub_task_progress / sub_task.length;
    sql += "UPDATE task SET progress = "+progress+" WHERE task_id = "+sub_task[0].task_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/delete_develop',function(req,res){
    var task_id = req.body.task_id;
    var sql =  "UPDATE sub_task SET actual_start_date = null, "+
                "actual_end_date = null, progress = null "+
                "WHERE task_id = "+task_id+";"+
                "UPDATE task SET progress = null WHERE task_id = "+task_id;
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/update_test_result',function(req,res){
    var sub_task_id = req.body.sub_task_id;
    var test_result = req.body.test_result;
    var sql = "";
    for(var i=0;i<sub_task_id.length;i++){
    sql +=  "UPDATE sub_task SET test_result = '"+test_result[i]+" " +
               "' WHERE sub_task_id = "+sub_task_id[i]+";";
       }
    //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_test_requirement_id',function(req,res){
    var task_id = req.body.task_id;
    const sql = "SELECT * FROM task AS t "+
        "WHERE t.task_id = "+task_id+" ";
   // res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_test_episode_task',function(req,res){
    var requirement_id = req.body.requirement_id;
    const sql = "SELECT * FROM task AS t "+
        "WHERE t.requirement_id = "+requirement_id+" ";
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