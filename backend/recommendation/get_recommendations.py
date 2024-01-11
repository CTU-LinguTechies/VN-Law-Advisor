from flask import *
from flask_cors import CORS, cross_origin
from importer import *
from directory import *
from waitress import serve
from crontab import CronTab

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cron = CronTab(user='tranhuy')
job = cron.new(command='/usr/bin/python classification.py')
job.month.every(1)
cron.write()

current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"


embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})

text_vectordb = Chroma(embedding_function=embeddings, persist_directory=TEXT_DB_PATH)


@app.route('/api/v1/', methods=['GET'])
def init():
    if request.method == 'GET':
        result = {
            "status": "success"
        }, 200
        
        return result
@app.route('/api/v1/get-recommendations', methods=['POST'])
def get_recommendations():
    if request.method == 'POST':
        req = request.get_json()
        if req:
            try:
                keyword = req["keyword"]
                num_of_relevant_texts = int(req["num_of_relevant_texts"])
            except ValueError:
                return {
                    "status": "error",
                    "response": "num_of_relevant_texts must be an integer",
                }, 400
            except:
                return {
                    "status": "error",
                    "response": "Keyword or num_of_relevant_texts not found in the payload",
                }, 400
            if not keyword:
                return {
                    "status": "error",
                    "response": "Keyword can not be empty",
                }, 400
            output = text_vectordb.similarity_search(keyword, k=num_of_relevant_texts)

            text_topics = []
            text_ids = []
            for doc in output:
                result_string = doc.page_content
                index = result_string.find("noi_dung: ")
                if index != -1:
                    result_string = result_string[index + len("noi_dung: "):].strip()
                text_topics.append({
                    "id": doc.metadata["id"],
                    "id_vb": doc.metadata["id_vb"],
                    "chi_muc_cha": doc.metadata["chi_muc_cha"],
                    "citation": result_string,
                })
                if doc.metadata["id_vb"] and doc.metadata["id_vb"] not in text_ids:
                    text_ids.append(doc.metadata["id_vb"])

            return {
                "text_topics": text_topics,
                "text_ids": text_ids
            }, 200
        else:
            return {
                    "status": "error",
                    "response": "Error while retrieving data from payload",
                }, 400

print('Recommendations server is running. ')
serve(app, host='0.0.0.0', port=5002, threads=1)
            