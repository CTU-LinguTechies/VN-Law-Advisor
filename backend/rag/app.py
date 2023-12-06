from flask import *
from flask_cors import CORS, cross_origin
from playhouse.shortcuts import model_to_dict
from models import *
from directory import *
from cache import *
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
from transformers import pipeline
import torch
import json
import jwt
from waitress import serve

current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"

embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=TOPIC_DB_PATH)
pipeline = pipeline(task="question-answering", model=QA_MODEL_PATH, local_files_only=True)


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/v1/question/<int:question_id>', methods=['GET'])
def get_question(question_id=None):
    if question_id is None:
        question = QuestionModel.select().dicts()
        return json.dumps(question), 201
    else:
        question = QuestionModel.get(QuestionModel.id == question_id)
        return json.dumps(question), 201

@app.route('/api/v1/question/email', methods=['GET'])
def get_questions_by_email():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[7:]
    decoded = jwt.decode(token, ACCESS_TOKEN_KEY, algorithms=['HS256'])
    email = decoded['email']

    questions = QuestionModel.select().where(QuestionModel.email == email).dicts()
    return json.dumps(list(questions)), 201
        
@app.route('/api/v1/question', methods=['POST'])
def add_question():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[7:]
    data = request.get_json()
    
    decoded = jwt.decode(token, ACCESS_TOKEN_KEY, algorithms=['HS256'])
    data['email'] = decoded['email']
    question = data['question']

    ciation = []
    topic_ids = []
    if not(redisClient.get(question)):
        output = vectordb.similarity_search(question, k=2)
        context = ""
        for doc in output:
            result_string = doc.page_content
            topic_id = doc.metadata["source"].split("/")[-1].split(".")[0]
            index = result_string.find("content: ")

            if index != -1:
                result_string = result_string[index + len("content: "):].strip()
            if topic_id and topic_id not in topic_ids:
                ReferenceModel.create(question=question, dieu_id=topic_id)
                topic_ids.append(topic_id)
            
            context += f"{result_string} "
            ciation.append(result_string)
        
        context = context.strip()
        response = pipeline(question=question, context=context)["answer"]
        data['answer'] = response
        redisClient.set(question, json.dumps({
                    "ciation": ciation,
                    "response": response,
                    "topic_ids": topic_ids
        }))
    else:
        return json.loads(redisClient.get(question).decode('utf-8')), 200
    
    QuestionModel.create(**data)
    return {
                    "status": "success",
                    "question": question,
                    "ciation": ciation,
                    "response": data['answer'],
                    "topic_ids": topic_ids,
                }, 200


@app.route('/api/v1/question/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.get_json()
    QuestionModel.update(**data).where(QuestionModel.id == question_id).execute()
    return '', 204

@app.route('/api/v1/question/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    QuestionModel.delete().where(QuestionModel.id == question_id).execute()
    return '', 204

print('Server is running. ')
serve(app, host='0.0.0.0', port=5001, threads=1, url_prefix="/rag/api/v1")