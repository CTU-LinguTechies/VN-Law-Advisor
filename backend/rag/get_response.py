from flask import *
from flask_cors import CORS, cross_origin
from importer import *
from directory import *
import json
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"


embeddings = HuggingFaceEmbeddings(model_name=model_path, model_kwargs={"device": current_device})
vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=persist_directory)

@app.route('/', methods=['GET'])
def init():
    if request.method == 'GET':
      
        result = {
            "status": "success"
        }, 200
        
        return result
@app.route('/get-response', methods=['POST'])
def uploadFile():
    if request.method == 'POST':
        req = request.json
        print(req["question"])
        if req:
            try:
                question = req["question"]
            except:
                return{
                    "status": "error",
                    "response": "Question is required",
                }, 400
            output = vectordb.similarity_search_with_score(question, k=2)
            result = [{"context": context.page_content, "score": score} for context, score in output]
            return {
                    "status": "success",
                    "response": result,
                }, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000')
            