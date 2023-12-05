from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from os import getenv
TEXT_DB_PATH= getenv("TEXT_DB_PATH") #Chroma DB Persist Directory for TEXT
ST_MODEL_PATH= getenv("ST_MODEL_PATH") #Sentence Transformers Model Path
QA_MODEL_PATH= getenv("QA_MODEL_PATH") #Question Answering Transformers Model Path
TOPIC_DB_PATH= getenv("TOPIC_DB_PATH") #Chroma DB Persist Directory for TEXT
