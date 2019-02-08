import flask
import os
from flask import jsonify, request
from flask import flash, redirect, url_for, session
from joblib import load
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import requests, json

logging.basicConfig(level=logging.INFO)
logging.getLogger('flask_cors').level = logging.DEBUG
logger = logging.getLogger('HELLO WORLD')



smokeModel = load('smokemlp.joblib')
app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = 'super secret key'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = (file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response

smdt = [[ 46. ,   0. ,   0. , 120.8,  32.5,   1. ,   0. ,   0. ,   0. ,
          0. ,   0. ,   1. ,   0. ,   1. ,   0. ]]

@app.route('/', methods=['GET'])
def home():
    print("hit")
    ans = smokeModel.predict(smdt)[0]
    print(ans)
    return jsonify( { "ans" : str(ans) } )

@app.route('/test', methods=['POST'])
def test():
    print( json.dumps( request.form ) )
    print( "ansssssssssssss ==" )
    ans = smokeModel.predict(smdt)[0]
    print(ans)
    return jsonify( { "ans" : "done" } )

app.run()
