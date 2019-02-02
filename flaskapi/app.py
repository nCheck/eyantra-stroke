import flask
from flask import jsonify, request
from joblib import load


smokeModel = load('smokemlp.joblib')
app = flask.Flask(__name__)
app.config["DEBUG"] = True

books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

smdt = [[ 46. ,   0. ,   0. , 120.8,  32.5,   1. ,   0. ,   0. ,   0. ,
          0. ,   0. ,   1. ,   0. ,   1. ,   0. ]]

@app.route('/', methods=['GET'])
def home():
    ans = smokeModel.predict(smdt)[0]
    print(ans)
    return jsonify( { "ans" : str(ans) } )

app.run()
