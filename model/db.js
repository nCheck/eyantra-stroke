/*

# Project Name: AI Based Early Stroke Detection 
# Author List: Nehal Kalnad,Ashley Lobo, e-Yantra Team 
# Filename: db.js 
# Functions: 
# Global Variables:	mongoose, database


*/	


var mongoose = require('mongoose'),
	database	 = 'mongodb://sanes4:sanes4ever@ds145194.mlab.com:45194/stroke-predict'
	
mongoose.connect(database , { useNewUrlParser: true });
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});

// It just initilizes the schemas and starts database

require('./doctor');
require('./patient');
require('./record');