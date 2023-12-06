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
import  re
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

@app.route('/api/v1/question', methods=['GET'])
def get_question(email=None):
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[7:]
        
    decoded = jwt.decode(token, ACCESS_TOKEN_KEY, algorithms=['HS256'])
    email = decoded['email']
    if email:
        query = QuestionModel.select().where(email == QuestionModel.email).dicts()
        res = []
        for row in query:
            answer = []
            query1 = Reference.select().where(row['id'] == Reference.question_id).dicts()
            for r in query1: 
                answer.append({"mapc": r['mapc'], "noidung": r['noidung']})
            res.append({
                "id": row['id'],
                "email": row['email'],
                "question": row['question'],
                "updatedAt": row['updatedAt'].strftime("%m/%d/%Y"),
                "response": row['response'],
                "answer": answer
            })
        return res, 201
    
@app.route('/api/v1/question', methods=['POST'])
def add_question():
    try: 
        token = request.headers.get('Authorization')

        if token.startswith('Bearer '):
            token = token[7:]
        data = request.get_json()
        decoded = jwt.decode(token, ACCESS_TOKEN_KEY, algorithms=['HS256'])

        email = decoded['email']
    except: 
         return {
            "status": "error",
            "response": "Need authencation",
        }, 400
         
    try:
        question = data["question"]
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

    if (redisClient.get(question)): 
        return json.loads(redisClient.get(question).decode('utf-8')), 200
    
    output = vectordb.similarity_search(question, k=2)

    context = ""
    ciation = []
    for doc in output:
        result_string = doc.page_content
        index = result_string.find("content: ")
        if index != -1:
            result_string = result_string[index + len("content: "):].strip()
        result_string = result_string.replace("\n", " ")
        result_string = re.sub(r"\s+", r" ", result_string)
        context += f"{result_string} "

        ciation.append({
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

    response = pipeline(question=question, context=context)["answer"].strip()

    query = QuestionModel.create(**{"email": email, "question": question ,"response": response})
    for c in ciation: 
        Reference.create(**{'question_id': query.id, 'mapc': c['mapc'], 'noidung': c['noidung']})
    res = {
        "status": "success",
        "question": question,
        "ciation": ciation,
        "response": response,
    }
    redisClient.set(question, json.dumps(res))
    return res, 200


@app.route('/api/v1/question/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.get_json()
    QuestionModel.update(**data).where(QuestionModel.id == question_id).execute()
    return '', 204

@app.route('/api/v1/question/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    QuestionModel.delete().where(QuestionModel.id == question_id).execute()
    return '', 204

print('QNA server is running. ')
serve(app, host='0.0.0.0', port=5001, threads=1, url_prefix="/rag/api/v1")