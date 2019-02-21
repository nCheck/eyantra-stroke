/*

# Project Name: AI Based Early Stroke Detection 
# Author List: Nehal Kalnad,Ashley Lobo, e-Yantra Team 
# Filename: api.js 
# Functions: 
# Global Variables:	express, app, uniCtrl, upCtrl


*/	


var express=require('express');
var router=express.Router();


var uniCtrl = require('../ctrlr/uni')
var upCtrl = require('../ctrlr/upload')



   

router.route('/uploadEEG')
    .post(upCtrl.uploadEEG)

router.route('/loadCSV')
    .get( upCtrl.loadCSV )

router.route('/uploadCSV')
    .post( upCtrl.uploadCSV )




router.route('/uploadRecord')
    .post(uniCtrl.uploadRecord)


















module.exports = router