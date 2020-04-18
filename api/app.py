from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return 'Hello world!'

informations = [
    {
        "count" : 123,
        "date" : "yesterday",
        "matches" : [0,1,2]
    }
]

result = 'BANANA'

@app.route('/api/information')
def extract_information():
    return jsonify({"info" : informations})

@app.route('/api/search', methods=['POST'])
def search_keywords():
    if(not request.json):
        abort(400)
    
    keyword = request.json['keyword']
    result = keyword + ' PISANG'
    return jsonify({'text': keyword + ' PISANG'}), 201

@app.route('/api/result', methods=['GET'])
@cross_origin()
def get_result():
    return jsonify({"result" : result})

if __name__ == '__main__':
    app.run(debug=True)

