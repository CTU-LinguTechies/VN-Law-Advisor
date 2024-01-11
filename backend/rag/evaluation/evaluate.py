"""
    This file is for running evaluation on the RAG system.
    Please install the following packages and get the GOOGLE GEMINI API KEY before running this file.
    pip install google-generative-ai pandas requests
    Then cd into evaluation folder to run.
"""

import sys, os
sys.path.append(os.path.abspath(os.path.join('..')))
import google.generativeai as genai
import pandas as pd
import re
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
import requests
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from os import getenv
TOPIC_DB_PATH= getenv("TOPIC_DB_PATH") #Chroma DB Persist Directory for TOPIC
ST_MODEL_PATH= getenv("ST_MODEL_PATH") #Sentence Transformers Model Path
QA_MODEL_PATH= getenv("QA_MODEL_PATH") #Question Answering Transformers Model Path

ACCESS_TOKEN_KEY= getenv("ACCESS_TOKEN_KEY")
from os import getenv
import json
import torch


GOOGLE_API_KEY=getenv('GOOGLE_API_KEY')
HF_API_URL = "https://hm78d3nz1mmn6cjr.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Authorization": "Bearer XXXXXX",
	"Content-Type": "application/json"
}
current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"
print(f"Path: {TOPIC_DB_PATH}")
embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=TOPIC_DB_PATH)

genai.configure(api_key=GOOGLE_API_KEY)

# print("Supported models:")
# for m in genai.list_models():
#   if 'generateContent' in m.supported_generation_methods:
#     print(m.name)

model = genai.GenerativeModel('gemini-pro')
# response = model.generate_content("Giải thích kiến trúc Transformer?")
# print(response)
# print(response.text)

def get_retrieval_evaluation_input(question, context):
    return f"Bạn đang là người đánh giá chất lượng của một retrieval system của hệ thống pháp luật. Hãy đánh giá tri thức pháp luật ngữ cảnh retrieve được sau đây trên thang điểm từ 0-100. Chỉ trả lời một con số, không thêm bất kỳ ký tự nào khác. Ngữ cảnh: {context}\nCâu hỏi: {question}"

def get_response_evaluation_input(question, answer):
    return f"Bạn là người đánh giá chất lượng câu trả lời của một LLM về pháp luật Việt Nam. Hãy đánh giá câu trả lời sau đây trên thang điểm từ 0-100. Chỉ trả lời một con số, không thêm bất kỳ ký tự nào khác. Câu hỏi: {question}\nCâu trả lời: {answer}"

def evaluate_question(question):
    print(f"Evaluating question: {question}")
    output = vectordb.similarity_search(question, k=2)
    context = ""
    citation = []
    retrieval_rating = ""
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
    # print(f"Context: {context}")
    if not context:
        print("Error while retrieving context from DB")
        return

    # Evaluate context
    inputs = get_retrieval_evaluation_input(question, context)
    evaluate_retrieval = model.generate_content(inputs)
    retrieval_rating = evaluate_retrieval.text
    print(f"Retrieval rating: {retrieval_rating}")
    

    inputs = f"Dựa vào văn bản sau đây:\n{context}\nHãy trả lời câu hỏi: {question}"
    payload = {
        "inputs": inputs
    }
    output = requests.post(HF_API_URL, headers=headers, json=payload)
    response = output.json()
    if len(response) < 0:
        print("Error while generating answer")
        return
    response = response[0]
    if not response:
        print("Error while generating answer")
        return 
    response = response["response"]

    # Evaluate response
    inputs = get_response_evaluation_input(question, response)
    evaluate_response = model.generate_content(inputs)
    print(evaluate_response.prompt_feedback)
    print(f"Response rating: {evaluate_response.text}")

    return { 
        "question": question,
        "context": context,
        "answer": response,
        "retrieval_rating": retrieval_rating,
        "response_rating": evaluate_response.text
    }
    
def main():
    index = 0
    with open("./evaluation/index.txt", "r", encoding="utf-8") as f:
        index = f.read()
        if index:
            index = int(index)
        f.close()
    print(f"Starting from index {index}")
    with open("./evaluation/questions.json", "r", encoding="utf-8") as f:
        questions = json.load(f)
    results = []
    print(f"Total questions: {len(questions)}")
    for question in questions[index::]:
        try:
            result = evaluate_question(question)
            index += 1
            results.append(result)
            df = pd.DataFrame(results)
            df.to_csv("./evaluation/results.csv", mode="a", index=False, encoding="utf-8")
            with open("./evaluation/index.txt", "w", encoding="utf-8") as f:
                f.write(str(index))
                f.close()
        except Exception as e:
            print(e)
            print(f"Error while evaluating question: {question}")
            continue

    df = pd.DataFrame(results)
    df.to_csv("./evaluation/results.csv", index=False, encoding="utf-8")
    with open("./evaluation/index.txt", "w", encoding="utf-8") as f:
        f.write(str(index))
        f.close()

if __name__ == "__main__":
    main()