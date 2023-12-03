from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma

from transformers import pipeline
import re
import torch