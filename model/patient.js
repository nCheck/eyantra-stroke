var mongoose = require('mongoose');
var Schema = mongoose.Schema


var patSchema = new Schema({

    name : {
        type : String,
        default : "Adam"
    } , 

    patientId : Number,
    docId : Number, 

    email :{
        type : String,
        default : "ncheckmemory0001@gmaill.com"
    }
    
});


module.exports = mongoose.model('Patient' , patSchema);