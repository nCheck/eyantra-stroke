// Your Requirments goes here
var express=require("express");
const multer = require('multer');
const path = require('path');
var parser=require('body-parser');
var request = require('request');

var app    = express();
app.use(parser.urlencoded({extended:true}));
const fs=require('fs');

module.exports.uploadEEG = (req , res , next) =>{
	const storage = multer.diskStorage({
	  destination: './flaskapi/upload',
	  filename: function(req, file, cb){
	    cb(null,"eeg.csv");
	  }
	});
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, (err) => {
		if(err){
			res.send('err ' + err);
		} else {
			if(req.file == undefined){
				res.send('Error: No File Selected!');
			} else {
				console.log("Uploaded");
				res.send('done');
			}
		}
	});

}

module.exports.uploadCSV = (req , res , next) =>{
	const storage = multer.diskStorage({
	  destination: './flaskapi/upload',
	  filename: function(req, file, cb){
	    cb(null,"temp.csv");
	  }
	});
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, (err) => {
		if(err){
			res.send('err ' + err);
		} else {
			if(req.file == undefined){
				res.send('Error: No File Selected!');
			} else {
				console.log("Uploaded");
				// next();
				res.send('done');
			}
		}
	});

}

module.exports.deleteFile = (req , res ) =>{

	var tmp_path ='./uploads/temp.xlsx';
	fs.unlink(tmp_path, function(err) {
			if (err) throw err;
			console.log('File uploaded Deleted ' );
	});
	res.send('Done');
}





//Reading========

module.exports.loadCSV = async (req, res) =>{

	await request('http://localhost:5000/loadCSV', function (error, response, body) {
		console.log('body:', body); // Print the HTML for the Google homepage.
		res.send({data : body})
	});

    
}