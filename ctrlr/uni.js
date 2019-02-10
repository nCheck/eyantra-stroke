/*

# Project Name: AI Based Early Stroke Detection 
# Author List: Nehal Kalnad,Ashley Lobo, e-Yantra Team 
# Filename: uni.js 
# Functions: uploadRecord
# Global Variables:	mongoose, request, Patient, Record, Doctor


*/	



var mongoose = require('mongoose')
var request = require('request')

var Patient = mongoose.model('Patient'),
    Doctor = mongoose.model('Doctor'),
    Record = mongoose.model('Record');



/**


	* Function Name: uploadRecord
	* Input: 		record of patient
	* Output: 		upload Status
	* Logic: 		uploads record to mLab server
	* Example Call:	post request to "/uploadRecod"



 **/



module.exports.uploadRecord = (req, res)=>{

    query = req.body;

    if ( query != null ){

        Record.create(query, (err, doc)=>{

            if(!err){
                console.log(doc)
                res.send({ doc: doc, status: "Success" })
            }
            else{
                res.send({status: "error"})
            }

        })

    }
    else{
        res.send({status: "error"})
    }

}


