"""
    This file is for running evaluation on the RAG system.
    Please install the following packages and get the GOOGLE GEMINI API KEY before running this file.
    pip install google-generative-ai pandas requests
"""

import google.generativeai as genai
import pandas as pd
import re
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
import requests
from directory import *
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from os import getenv


GOOGLE_API_KEY=getenv('GOOGLE_API_KEY')
HF_API_URL = "https://iofuyi0iny87dl65.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Authorization": "Bearer XXXXXX",
	"Content-Type": "application/json"
}
embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=TOPIC_DB_PATH)

genai.configure(api_key=GOOGLE_API_KEY)

print("Supported models:")
for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)

model = genai.GenerativeModel('gemini-pro')
# response = model.generate_content("What is the meaning of life?")
# print(response.text)

def get_retrieval_evaluation_input(input):
    return f"Bạn là một {input}"

def get_response_evaluation_input(question, answer):
    return f"Bạn là người đánh giá chất lượng câu trả lời của một LLM về pháp luật Việt Nam. Hãy đánh giá câu trả lời sau đây trên thang điểm từ 0-100. Chỉ trả lời một con số, không thêm bất kỳ ký tự nào khác. Câu hỏi: {question}\nCâu trả lời: {answer}"

def evaluate_question(question):
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
    if not context:
        print("Error while retrieving context from DB")
        return

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

    return { 
        "question": question,
        "context": context,
        "answer": response,
        "retrieval_rating": retrieval_rating,
        "response_rating": evaluate_response.text
    }
    
