"""

# Project Name: AI Based Early Stroke Detection 
# Author List: Nehal Kalnad,Ashley Lobo, e-Yantra Team 
# Filename: app.py 
# Functions: loadCSV , loadEEG , checker, predict
# Global Variables:	smokeModel , scaler, app


"""			


import flask
import os
from flask import jsonify, request
from flask import flash, redirect, url_for, session
from joblib import load
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import requests, json
import pandas as pd




smokeModel = load('smokemlp.joblib')
scaler = load('scaler.joblib')





app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = 'super secret key'
cors = CORS(app, resources={r"/*": {"origins": "*"}})





"""

	* Function Name: 	loadCSV
	* Input: 		temp.csv uploaded in upload folder
	* Output: 		systolic, diastolic, heartrate and temperature data.
	* Logic: 		function uses pandas library to read data which was logged at tera-term
	* Example Call:	get request to "/loadCSV"


"""


@app.route('/loadCSV', methods=['GET'])
def loadCSV():
    print("loaded")
    testData = pd.read_csv("upload/temp.csv")
    print(testData)
    print(testData.columns)
    data = testData.columns
    print()
    return jsonify( { 'sys': data[0] , 'dis' : data[1], 'hrt' : data[2], 'temp' : testData[data[1]][0]  } )



"""

	* Function Name: 	loadEEG
	* Input: 		eeg.csv uploaded in upload folder
	* Output: 		gammaMid value
	* Logic: 		function uses pandas library to read data.
	* Example Call:	get request to "/loadEEG"	


"""



@app.route('/loadEEG', methods=['GET'])
def loadEEG():
    print("loaded")
    df = pd.read_csv('upload/eeg.csv')
    data = df['gammaMid'].median()
    print()
    return jsonify( { 'gammaMid' : data } )



"""

	* Function Name: 	checker
	* Input: 		val,  need
	* Output: 		1 or 0
	* Logic: 		one hot encoding of input data
	* Example Call:	checker('Rural', res_type)	


"""


def checker(val,need = True):
    return 1 if val == need else 0


"""

	* Function Name: predict	
	* Input: age, hypertension, heart_disease , height, weight, 
    *        work_type, res_type, smoke,systolic, diastolic, temperature , heartrate ,
	* Output: 	stroke(boolean)	
	* Logic: 	it takes all demographic input, converts it into form accepted by our machine learning model.
    *           it takes input taken by sensors and applies simple if-else logic based on analysis
    *           combining the the probablities of both, we get final probabilty which will help us to predict stroke. 	
	* Example Call:	post request to "/predict"	
"""


@app.route('/predict', methods=['POST'])
def predict():
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
    if data['systolic']> 199 and data['diastolic']>100:
        count+=1
    if data['temperature']> 41:
        count+=1
    if data['gammaMid'] > 9769:
        count+=1
    predict = 0.25*(ans[1])+0.75*(1*count/3)

    stroke = False
    if predict > 0.49:
        stroke = True
    print(stroke , round(predict, 4),data['systolic'] , count)
    return jsonify( { "stroke" : stroke } )






app.run(host='0.0.0.0',port=5000)
