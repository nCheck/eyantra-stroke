/*

# Project Name: AI Based Early Stroke Detection 
# Author List: Nehal Kalnad,Ashley Lobo, e-Yantra Team 
# Filename: upload.js 
# Functions: uploadEEG, uploadCSV, loadCSV
# Global Variables:	multer, request, fs


*/	






const multer = require('multer');
var request = require('request');





/**


	* Function Name: uploadEEG
	* Input: 		EEG file
	* Output: 		upload Status
	* Logic: 		stores file on local filesystem
	* Example Call:	post request to "/uploadEEG"



 **/


module.exports.uploadEEG = (req , res ) =>{
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


/**


	* Function Name: uploadCSV
	* Input: 		CSV file
	* Output: 		upload Status
	* Logic: 		stores file on local filesystem
	* Example Call:	post request to "/uploadCSV"



 **/




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


/**


	* Function Name: loadCSV
	* Input: 		none
	* Output: 		data stored in temp.csv (BP, Heartrate, Temperature)  
	* Logic: 		makes api request to flask server
	* Example Call:	get request to "/loadCSV"



 **/






module.exports.loadCSV = async (req, res) =>{

	await request('http://localhost:5000/loadCSV', function (error, response, body) {
		res.send({data : body})
	});

    
}