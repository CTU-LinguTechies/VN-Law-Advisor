from flask import *
from flask_cors import CORS, cross_origin
from importer import *
from directory import *
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"


embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
topic_vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=TOPIC_DB_PATH)
pipeline = pipeline(task="question-answering", model=QA_MODEL_PATH, local_files_only=True)


@app.route('/', methods=['GET'])
def init():
    if request.method == 'GET':
      
        result = {
            "status": "success"
        }, 200
        
        return result
@app.route('/get-response', methods=['POST'])
def get_response():
    if request.method == 'POST':
        req = request.get_json()
        if req:
            try:
                question = req["question"]
            except:
                return {
                    "status": "error",
                    "response": "Question is required",
                }, 400
            
            output = topic_vectordb.similarity_search(question, k=2)

            context = ""
            ciation = []
            topic_ids = []
            for doc in output:
                result_string = doc.page_content
                topic_id = doc.metadata["source"].split("/")[-1].split(".")[0]
                index = result_string.find("content: ")

                if index != -1:
                    result_string = result_string[index + len("content: "):].strip()
                if topic_id and topic_id not in topic_ids:
                    topic_ids.append(topic_id)
                
                context += f"{result_string} "
                ciation.append(result_string)
            
            context = context.strip()
            response = pipeline(question=question, context=context)["answer"]

            return {
                    "status": "success",
                    "question": question,
                    "ciation": ciation,
                    "response": response,
                    "topic_ids": topic_ids,
                }, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000')
            