var express=require('express');
var router=express.Router();
var mongoose              = require('mongoose');

var uniCtrl = require('../ctrlr/uni')



router.route('/test')
    .get(uniCtrl.trialGet)
    .post(uniCtrl.trialPost);


router.route('/upload')
    .post(uniCtrl.uploadRecord)
















module.exports = router