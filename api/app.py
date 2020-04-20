from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
from matcher import get_numbers_span

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

data = {}

@app.route('/api/keyword', methods=['GET'])
@cross_origin()
def get_keyword():
    global data
    return jsonify(data)

@app.route('/api/search', methods=['POST'])
@cross_origin()
def search_keywords():
    if(not request.json or not ('keyword' in request.json and 'content' in request.json and 'filename' in request.json)):
        abort(400)
    
    global data
    data = {
        'filename': request.json['filename'],
        'keyword': request.json['keyword'],
        'content': request.json['content']
    }
    return jsonify({'result': data}), 201

@app.route('/api/extract_information', methods=['GET'])
@cross_origin()
def extract_information():
    global data 
    extraction = {
        'filename': data['filename'],
        'keyword': data['keyword'],
        'content': data['content'],
        'numberSpan': get_numbers_span(data['content'])
    }
    return jsonify({"result": extraction})

if __name__ == '__main__':
    app.run(debug=True)

