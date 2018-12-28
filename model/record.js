var mongoose = require('mongoose');
var Schema = mongoose.Schema


var recSchema = new Schema({

    BP_sys : Number,
    BP_dys : Number,
    AH : Number,
    AL : Number,
    BH : Number,
    BL : Number,
    TH : Number,
    TL : Number,
    GH : Number,
    GL : Number,

    patientId : Number,

    prediction : {
        type : Number,
        default : 0.0
    }

    
});


module.exports = mongoose.model('Record' , recSchema);