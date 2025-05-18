from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, resources={
    r"/analyze": {
        "origins": ["chrome-extension://*"],
        "methods": ["POST"]
    }
})

# Load models
with open('tfidf_vectorizer.pkl', 'rb') as f:
    tfidf = pickle.load(f)

with open('sentiment_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        texts = data.get('texts', [])
        
        if not texts:
            return jsonify({"error": "No texts provided"}), 400
        
        # Transform and predict
        X = tfidf.transform(texts)
        predictions = model.predict(X)
        
        return jsonify({
            "results": [
                {"text": text, "sentiment": str(pred)}
                for text, pred in zip(texts, predictions)
            ]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
