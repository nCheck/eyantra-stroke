import flask
import os
from flask import jsonify, request
from flask import flash, redirect, url_for, session
from joblib import load
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import requests, json
import pandas as pd


logging.basicConfig(level=logging.INFO)
logging.getLogger('flask_cors').level = logging.DEBUG
logger = logging.getLogger('HELLO WORLD')



smokeModel = load('smokemlp.joblib')
scaler = load('scaler.joblib')





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

smdt = [ 0.27209932, -0.49484754, -0.39897751, -0.3379889 ,  2.56550825,
       -0.0427843 , -1.25554587, -0.56775498, -0.10375124,  1.01120843,
       -1.01120843, -0.65142889,  1.02465722, -0.52217225]

@app.route('/', methods=['GET'])
def home():
    print("hit")
    ans = smokeModel.predict(smdt)[0]
    print(ans)
    return jsonify( { "ans" : str(ans) } )



@app.route('/loadCSV', methods=['GET'])
def data():
    print("loaded")
    testData = pd.read_csv("upload/temp.csv")
    print(testData)
    print(testData.columns)
    data = testData.columns
    print()
    return jsonify( { 'sys': data[0] , 'dis' : data[1], 'hrt' : data[2], 'temp' : testData[data[1]][0]  } )

@app.route('/loadEEG', methods=['GET'])
def gamma():
    print("loaded")
    df = pd.read_csv('upload/eeg.csv')
    data = df['gammaMid'].median()
    print()
    return jsonify( { 'gammaMid' : data } )

def checker(val,need = True):
    return 1 if val == need else 0

@app.route('/predict', methods=['POST'])
def test():
    # print( json.dumps( request.json['data'] ) )

    data = request.json['data'] 

    print( type(data) )
    age = data['age']
    hypertension = checker( data['hypertension'] )
    heart_disease = checker( data['heart_disease'] )
    bmi = float(data['weight']/((data['height']/100)**2))

    res_type = data['res_type']
    res_type_Rural = checker('Rural', res_type)
    res_type_Urban = checker('Urban', res_type)



    work = data['work_type']
    work_type_Govt_job = checker('Govt_job', work)
    work_type_Never_worked = checker( 'Never_worked' , work )
    work_type_Private = checker( 'Private' , work )
    work_type_Self_employed = checker( 'Self-employed' , work ) #dash is annoying
    work_type_children = checker( 'children' , work )

    smoke = data['smoke']
    smoke_formerly_smoked = checker(smoke , 'formerly')
    smoke_never_smoked = checker(smoke, 'No')
    smoke_smokes = checker(smoke, 'Yes')

    df = [age , hypertension, heart_disease, bmi, work_type_Govt_job, 
    work_type_Never_worked, 	work_type_Private ,	work_type_Self_employed ,
    work_type_children, res_type_Rural ,	res_type_Urban 	,
    smoke_formerly_smoked ,	smoke_never_smoked ,smoke_smokes]


    df = scaler.transform([df])
    ans = smokeModel.predict_proba( df )[0]
    if ans[1] < 0.1:
        ans[1] = 0

    count=0
    if data['systolic']>200 and data['diastolic']>100:
        count+=1
    if data['temperature']> 42:
        count+=1
    if data['gammaMid']>9769:
        count+=1
    predict=0.4*(ans[1])+0.6*(1*count/3)

    stroke = False
    if predict > 0.5:
        stroke = True
    print(stroke , predict)
    return jsonify( { "stroke" , stroke } )




"""

Object {   "age": 54,
"diastolic": 75,
"equip": false,
"gammaMid": 1081652,
"heart_disease": true,
"heartrate": 77,
"height": 180,
"hypertension": true,
"id": 55,
"name": "hel",
"res_type": "Urban",
"smoke": true,
"systolic": 104,
"temperature": 33.5,
"weight": 88,
"work_type": "Private",
 }

"""



app.run(host='0.0.0.0',port=5000)
