const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');

router.post('/show_company',function(req,res){
    const sql = "SELECT * FROM customer AS dv LEFT JOIN business_type AS dp ON dv.business_type_id = dp.business_type_id";
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/show_company_by_id',function(req,res){
    
    const customer_id = req.body.customer_id;

    const sql = "SELECT * FROM customer AS em "+
                "LEFT JOIN business_type AS dv ON em.business_type_id = dv.business_type_id "+
                " WHERE em.customer_id = "+customer_id;
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});

router.post('/add_company',function(req,res){
    const company_name = req.body.company_name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const customer_name = req.body.customer_name;
    const business_type_id = req.body.business_type_id;
    const sql = "INSERT INTO customer (customer_id, company_name, address, email, phone_number, customer_name, business_type_id)" + 
                " VALUES ((SELECT CAST(get_id('customer','customer_id') AS INT ))," +
                "'"+company_name+"','"+address+"','"+email+"','"+phone_number+"','"+customer_name+"','"+business_type_id+"')";
   //res.send(sql);
    pool.query(sql, (qur_err, qur_res) => {
        
        if(qur_err){
            res.send("error");
        }else{
            res.send(qur_res.rows);
        }
    })
});

router.post('/delete_company',function(req,res){
    const customer_id = req.body.customer_id;
    const sql = "DELETE FROM customer WHERE customer_id = "+customer_id;
    pool.query(sql, (qur_err, qur_res) => { 
        if(qur_err){
            res.send("error");
        }else{
            res.send(qur_res.rows);
        }
    })
});

router.post('/update_company',function(req,res){ 
    const customer_id = req.body.customer_id;
    const company_name = req.body.company_name;
    const address = req.body.address;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const customer_name = req.body.customer_name;
    const business_type_id = req.body.business_type_id;
    const sql = "UPDATE customer SET company_name = '"+company_name+
                "', address = '"+address+
                "', email = '"+email+ 
                "', phone_number = '"+phone_number+
                "', customer_name = '"+customer_name+
                "', business_type_id = '"+business_type_id+
                "' WHERE customer_id = '"+customer_id+"'";
    pool.query(sql, (qur_err, qur_res) => {
        if(qur_err){
            res.json("error");
        }else{
            res.json(qur_res.rows);
        }
    })
});




module.exports = router;