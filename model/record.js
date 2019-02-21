var mongoose = require('mongoose');
var Schema = mongoose.Schema


var recSchema = new Schema({

    age : Number,
    diastolic : Number,
    systolic : Number,
    temperature : Number,
    weight : Number,
    equiq : Number,
    gammaMid : Number,
    heart_disease : Number,
    heartrate : Number,
    height : Number,
    hypertension : Boolean,
    id : Number,
    name : String,
    res_type : String,
    work_type : String,
    smoke : String,




    prediction : {
        type : Number,
        default : 0.0
    }

    
});


module.exports = mongoose.model('Record' , recSchema);