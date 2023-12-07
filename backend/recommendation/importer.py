from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma


import torch

from dotenv import load_dotenv
import os

load_dotenv()
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_PORT = os.getenv("MYSQL_PORT")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")


