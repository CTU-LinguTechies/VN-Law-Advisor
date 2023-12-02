from flask import *
from flask_cors import CORS, cross_origin
from playhouse.shortcuts import model_to_dict
from models import *
from directory import *
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
from transformers import pipeline
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

@app.route('/question', methods=['GET'])
@app.route('/question/<int:question_id>', methods=['GET'])
def get_question(question_id=None):
    if question_id is None:
        question = QuestionModel.select()
        return jsonify(model_to_dict(question)), 201
    else:
        question = QuestionModel.get(QuestionModel.id == question_id)
        return jsonify(model_to_dict(question)), 201
        
@app.route('/question', methods=['POST'])
def add_question():
    data = request.get_json()
    question = data['question']
    output = vectordb.similarity_search(question, k=2)
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
    data['answer'] = response
    QuestionModel.create(**data)
    return jsonify(answer=data['answer']), 201

@app.route('/question/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.get_json()
    QuestionModel.update(**data).where(QuestionModel.id == question_id).execute()
    return '', 204

@app.route('/question/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    QuestionModel.delete().where(QuestionModel.id == question_id).execute()
    return '', 204

@app.route('/comment', methods=['GET'])
@app.route('/comment/<int:comment_id>', methods=['GET'])
def get_comment(comment_id=None):
    if comment_id is None:
        comment = CommentModel.select()
        return jsonify(model_to_dict(comment)), 201
    else:
        comment = CommentModel.get(CommentModel.id == comment_id)
        return jsonify(model_to_dict(comment)), 201
        
@app.route('/comment', methods=['POST'])
def add_comment():
    data = request.get_json()
    comment = CommentModel.create(**data)
    return jsonify(comment_id=comment.id), 201

@app.route('/comment/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    data = request.get_json()
    CommentModel.update(**data).where(CommentModel.id == comment_id).execute()
    return '', 204

@app.route('/comment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    CommentModel.delete().where(CommentModel.id == comment_id).execute()
    return '', 204

app.run(debug=True)