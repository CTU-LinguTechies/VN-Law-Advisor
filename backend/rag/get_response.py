from flask import *
from flask_cors import CORS, cross_origin
from importer import *
from directory import *
import requests

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

API_URL = "https://iofuyi0iny87dl65.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Authorization": "Bearer XXXXXX",
	"Content-Type": "application/json"
}


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
                    "response": "No question in payload",
                }, 400
            
            if not question:
                return {
                    "status": "error",
                    "response": "Question can not be empty",
                }, 400

            output = topic_vectordb.similarity_search(question, k=2)

            context = ""
            citation = []
            for doc in output:
                result_string = doc.page_content
                index = result_string.find("noidung: ")
                if index != -1:
                    result_string = result_string[index + len("noidung: "):].strip()
                result_string = result_string.replace("\n", " ")
                result_string = re.sub(r"\s+", r" ", result_string)
                context += f"{result_string} "

                citation.append({
                    "mapc": doc.metadata["mapc"],
                    "_link": doc.metadata["_link"],
                    "chude_id": doc.metadata["chude_id"],
                    "demuc_id": doc.metadata["demuc_id"],
                    "ten": doc.metadata["ten"],
                    "noidung": result_string
                })
            
            context = context.strip()
            if not context:
                return {
                    "status": "error",
                    "response": "Error while retrieving context from DB",
                }, 500


            # inputs = f"Sử dụng thông tin được cung cấp sau đây và những thông tin bạn biết để trả lời cho câu hỏi, Thông tin cung cấp {context}. Hãy trả lời câu hỏi: {question}"
            # payload = {
            #     "inputs": inputs
            # }
            # output = requests.post(API_URL, headers=headers, json=payload)
            # response =  output.json()
            # if len(response) < 0:
            #     return {
            #         "status": "error",
            #         "response": "Error while generating answer",
            #     }, 500
            # response =  response[0]
            # if not response:
            #     return {
            #         "status": "error",
            #         "response": "Error while generating answer",
            #     }, 500
            # response =  response["response"]

            response = pipeline(question=question, context=context)["answer"].strip()

            return {
                    "status": "success",
                    "question": question,
                    "citation": citation,
                    "response": response,
                }, 200
        else:
            return {
                    "status": "error",
                    "response": "Error while retrieving data from payload",
                }, 400
@app.route('/get-response-with-context', methods=['POST'])
def get_response_with_context():
    if request.method == 'POST':
        req = request.get_json()
        if req:
            try:
                question = req["question"]
                context = req["context"]
            except:
                return {
                    "status": "error",
                    "response": "Question or Context not found in the payload",
                }, 400
            if not question:
                return {
                    "status": "error",
                    "response": "Question can not be empty",
                }, 400
            if not context:
                return {
                    "status": "error",
                    "response": "Context can not be empty",
                }, 400
            output = topic_vectordb.similarity_search(question, k=2)

            
            citation = []
            for doc in output:
                result_string = doc.page_content
                index = result_string.find("noidung: ")
                if index != -1:
                    result_string = result_string[index + len("noidung: "):].strip()
                result_string = result_string.replace("\n", " ")
                result_string = re.sub(r"\s+", r" ", result_string)
                

                citation.append({
                    "mapc": doc.metadata["mapc"],
                    "_link": doc.metadata["_link"],
                    "chude_id": doc.metadata["chude_id"],
                    "demuc_id": doc.metadata["demuc_id"],
                    "ten": doc.metadata["ten"],
                    "noidung": result_string
                })


            # inputs = f"Sử dụng thông tin được cung cấp sau đây và những thông tin bạn biết để trả lời cho câu hỏi, Thông tin cung cấp {context}. Hãy trả lời câu hỏi: {question}"
            # payload = {
            #     "inputs": inputs
            # }
            # output = requests.post(API_URL, headers=headers, json=payload)
            # response =  output.json()
            # if len(response) < 0:
            #     return {
            #         "status": "error",
            #         "response": "Error while generating answer",
            #     }, 500
            # response =  response[0]
            # if not response:
            #     return {
            #         "status": "error",
            #         "response": "Error while generating answer",
            #     }, 500
            # response =  response["response"]


            response = pipeline(question=question, context=context)["answer"].strip()

            return {
                    "status": "success",
                    "question": question,
                    "citation": citation,
                    "response": response,
                }, 200
        else:
            return {
                    "status": "error",
                    "response": "Error while retrieving data from payload",
                }, 400
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000')
            