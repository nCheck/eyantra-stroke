var mongoose = require('mongoose')
var request = require('request')
global.fetch = require('node-fetch')

var Patient = mongoose.model('Patient'),
    Doctor = mongoose.model('Doctor'),
    Record = mongoose.model('Record');





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

module.exports.predict = (req, res) =>{

    console.log(req.query, " q ")
    console.log(req.body , " b ")

    request.post({url:'http://localhost:5000/test', 
                    form: req.body.form}, function(err,httpResponse,body){
        
                        if(err){
                            console.log("Error", err)
                        }else{
                            console.log(body)
                        }

     })    

    res.send({"status" : "Done"})
}
