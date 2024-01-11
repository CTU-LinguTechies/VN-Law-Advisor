"""
    Evaluate codification using Gemini Pro. Using the same approach as evaluate.py with data from law service.
    To get started, please run law-service locally, get Gemini Pro API key and put it in .env file.
"""
import requests
import google.generativeai as genai
import pandas as pd

from os import getenv
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

# Load Gemini Pro for evaluation
GOOGLE_API_KEY=getenv('GOOGLE_API_KEY')
GOOGLE_API_KEY_2=getenv('GOOGLE_API_KEY_2')
GOOGLE_API_KEY_3=getenv('GOOGLE_API_KEY_3')
API_KEYS = [GOOGLE_API_KEY, GOOGLE_API_KEY_2, GOOGLE_API_KEY_3]
KEY_INDEX = 0

genai.configure(api_key=API_KEYS[KEY_INDEX])
model = genai.GenerativeModel('gemini-pro')

def get_evaluation_input(law_section, header):
    return "Bạn là người đánh giá chất lượng cho việc phân lớp điều văn bản pháp luật vào đề mục phù hợp dựa theo tên đề mục và nôi dung diều văn bản pháp luật. Hãy đánh giá trên thang điểm từ 0 đến 100, không thêm bất kỳ ký tự nào khác. Đề mục: " + header + "\nNội dung điều văn bản pháp luật: " + law_section

def evaluate(id, law_section, header):
    print(f"Evaluating vbqpql {id}")
    input = get_evaluation_input(law_section, header)
    try:
        response = model.generate_content(input)
        return response.text
    except Exception as e:
        print("Error occured, trying another API key ...")
        global KEY_INDEX
        KEY_INDEX = (KEY_INDEX + 1) % len(API_KEYS)
        genai.configure(api_key=API_KEYS[KEY_INDEX])
        response = model.generate_content(input)
        return response.text



def main():
    demucs = requests.get("http://localhost:8000/law/api/v1/demuc/all").json()
    count = 0
    checkpoint = None
    with open("evaluation/evaluate-codification-checkpoint", "r") as f:
        checkpoint = f.read()
    print(f"Checkpoint: {checkpoint or 'Nothing'}")
    for demuc in demucs:
        if checkpoint:
            if demuc["id"] != checkpoint:
                continue
            else:
                checkpoint = None
        print(f"Evaluating demuc {demuc['id']}")
        demuc_score = {
            "demuc_id": demuc["id"],
            "demuc_ten": demuc["ten"],
            "demuc_rating": 0
        }
        vbqpql_of_demuc_scores = []
        page = 0
        while True:
            try:
                vbqpql_of_demucs = requests.get(f"http://localhost:8000/law/api/v1/phapdien-vbpl?deMucId={demuc['id']}&pageNo={page}").json()
                print(f"Page {page}")
                if not vbqpql_of_demucs or len(vbqpql_of_demucs["content"]) == 0:
                    break
                page += 1
                for vbqpql_of_demuc in vbqpql_of_demucs["content"]:
                    count += 1
                    rating = evaluate(vbqpql_of_demuc['id'], vbqpql_of_demuc["noi_dung"], demuc["ten"])
                    vbqpql_of_demuc_scores.append(int(rating))
            except Exception as e:
                print(e)
                continue
        if len(vbqpql_of_demuc_scores) == 0:
            continue
        demuc_score = {
            "demuc_id": demuc["id"],
            "demuc_ten": demuc["ten"],
            "chude_id": demuc["chude"]["id"],
            "chude_ten": demuc["chude"]["ten"],
            "demuc_rating": sum(vbqpql_of_demuc_scores) / len(vbqpql_of_demuc_scores)
        }
        df = pd.DataFrame([demuc_score])
        df.to_csv("evaluation/demuc_scores.csv", mode='a', index=False)
        with open("evaluation/evaluate-codification-checkpoint", "w") as f:
            f.write(str(demuc["id"]))        
    print(f"Total evaluated: {count}")

# Call only when this file is executed directly.
if __name__ == "__main__":
    main()
