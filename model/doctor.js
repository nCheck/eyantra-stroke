var mongoose = require('mongoose');
var Schema = mongoose.Schema


var docSchema = new Schema({

    name : {
        type : String,
        default : "nCheck"
    } , 
    docId : Number, 
    specialty : {
        type : String,
        default : "Neurologist"
    },
    email :{
        type : String,
        default : "ncheckmemory0002@gmaill.com"
    }
    
});


module.exports = mongoose.model('Doctor' , docSchema);