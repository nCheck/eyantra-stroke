var express=require('express');
var router=express.Router();
var mongoose              = require('mongoose');

var uniCtrl = require('../ctrlr/uni')
var upCtrl = require('../ctrlr/upload')


router.route('/test')
    .get(uniCtrl.trialGet)
    .post(uniCtrl.trialPost);


router.route('/predict')
    .post(uniCtrl.predict)    

router.route('/uploadFile')
    .post(upCtrl.uploadFile)

router.route('/upload')
    .post(uniCtrl.uploadRecord)
















module.exports = router