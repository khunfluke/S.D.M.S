const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('./cors.js')
const app = express();

app.use(cors.permisos);
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api',require('./server/api.js'));
app.use('/login',require('./server/login.js'));
app.use('/department',require('./server/department.js'));
app.use('/division',require('./server/division.js'));
app.use('/business_type',require('./server/business_type.js'));
app.use('/staff',require('./server/staff.js'));
app.use('/meeting',require('./server/meeting.js'));
app.use('/attendees',require('./server/attendees.js'));
app.use('/requirement',require('./server/requirement.js'));
app.use('/upload',require('./server/upload.js'));
app.use('/company',require('./server/company.js'));
app.use('/position',require('./server/position.js'));
app.use('/approve',require('./server/approve.js'));
app.use('/task',require('./server/task.js'));
app.use('/testing',require('./server/testing.js'));
app.use('/report',require('./server/report.js'));
app.use('*',function(req,res){
   // res.sendFile(path.join(__dirname,'index.html'));
   // res.end('Hello Angular4 and NodeJs');
})

const server = app.listen(3500,function(){
    const port = server.address().port; 
    console.log("Server is run... at port "+port);
})