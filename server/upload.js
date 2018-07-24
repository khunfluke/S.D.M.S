const express = require('express');
const router = express.Router();
const pool = require('./connectDatabase.js');
const fs = require('fs');
const app = express();
const path = require('path');

var multer = require('multer');
var DIR = './upload/requirement/';
var DME = './upload/meeting/';
var DTE = './upload/testing/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/requirement/')
  },
  filename: function (req, file, cb) {
    var filename = file.originalname;
    cb(null,filename);
  }
});

var storage_bymeeting = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/meeting/')
  },
  filename: function (req, file, cb) {
    var filename = file.originalname;
    cb(null,filename);
  }
});

var storage_by_testing = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/testing/')
  },
  filename: function (req, file, cb) {
    var filename = file.originalname;
    cb(null,filename);
  }
});

//var upload = multer({dest: DIR}).single('document');
var upload = multer({ storage: storage }).single('document');
var upload_file_bymeeting = multer({ storage: storage_bymeeting }).single('document');
var upload_file_by_testing = multer({ storage: storage_by_testing }).single('document');

router.post('/upload',function(req,res){
  var path = '';
  //console.log(req);
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
          return res.status(422).send("an Error occured")
    }else{
      res.json({
        success: true,
        message: 'File uploaded!'
    });
    }
  });
})

router.post('/upload_file_bymeeting',function(req,res){
  var path = '';
  //console.log(req);
  upload_file_bymeeting(req, res, function (err) {
    if (err) {
      console.log(err);
          return res.status(422).send("an Error occured")
    }else{
      res.json({
        success: true,
        message: 'File uploaded!'
    });
    }
  });
})

router.post('/remove_file',function(req,res){
  var file_name = req.body.file_name
  fs.unlink(DIR+file_name, (err) => {
    if (err) throw err;
    res.json('successfully deleted');
  });
})
router.post('/download',function(req,res){
  file_path = path.join(__dirname,'../upload/requirement/')+req.body.file_name;
  res.sendFile(file_path);
})

router.post('/remove_file_by_meeting',function(req,res){
  var file_name = req.body.file_name
  fs.unlink(DME+file_name, (err) => {
    if (err) throw err;
    res.json('successfully deleted');
  });
})

router.post('/download_meeting',function(req,res){
  file_path = path.join(__dirname,'../upload/meeting/')+req.body.file_name;
  res.sendFile(file_path);
})

router.post('/upload_file_by_testing',function(req,res){
  var path = '';
  //console.log(req);
  upload_file_by_testing(req, res, function (err) {
    if (err) {
      console.log(err);
          return res.status(422).send("an Error occured")
    }else{
      res.json({
        success: true,
        message: 'File uploaded!'
    });
    }
  });
})

router.post('/download_testing',function(req,res){
  file_path = path.join(__dirname,'../upload/testing/')+req.body.file_name;
  res.sendFile(file_path);
})

router.post('/remove_file_by_testing',function(req,res){
  var file_name = req.body.file_name
  fs.unlink(DTE+file_name, (err) => {
    if (err) throw err;
    res.json('successfully deleted');
  });
})

module.exports = router;