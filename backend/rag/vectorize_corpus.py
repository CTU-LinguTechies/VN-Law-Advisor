from langchain.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.chroma import Chroma
from langchain.document_loaders import DirectoryLoader

DOCS_PATH = ""
DB_PERSIST_PATH = ""
ST_MODEL_PATH=""


loader = DirectoryLoader(DOCS_PATH, glob="./*.csv", loader_cls=CSVLoader)
results = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1500, chunk_overlap=0)
texts = text_splitter.split_documents(results)


embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": "cuda"})
vectordb = Chroma.from_documents(documents=texts,
                                 embedding=embeddings,
                                 persist_directory=DB_PERSIST_PATH)
vectordb.persist()