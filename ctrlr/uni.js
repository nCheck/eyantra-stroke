var mongoose = require('mongoose')

global.fetch = require('node-fetch')

var Patient = mongoose.model('Patient'),
    Doctor = mongoose.model('Doctor'),
    Record = mongoose.model('Record');


var tf = require('@tensorflow/tfjs');




module.exports.trialGet = async(req, res) =>{

    console.log(req.query, " q ")
    console.log(req.body , " b ")

    const model = await tf.loadModel('http://localhost:9966/public/model.json');

    console.log(model)
    res.send({"status" : "Done"})
}



module.exports.trialPost = (req, res) =>{

    console.log(req.query, " q ")
    console.log(req.body , " b ")

    res.send({"status" : "Done"})
}



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