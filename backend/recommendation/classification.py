from importer import *
from directory import *
from sqlalchemy import create_engine
import pandas as pd


current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"

embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})

topic_vectordb = Chroma(embedding_function=embeddings, persist_directory=TOPIC_DB_PATH)

engine = create_engine(f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:3306/{MYSQL_DATABASE}")

# dieu = ''' Điều 5. Cá nhân người nước ngoài là công dân của nước có chung biên giới được phép kinh doanh tại Khu vực biên giới và Khu vực kinh tế cửa khẩu của Việt Nam, có Đồng Việt Nam thu được từ bán hàng hoá, cung ứng dịch vụ và các nguồn thu Đồng Việt Nam hợp pháp khác được phép: 
#  1. Mở và duy trì tài khoản Đồng Việt Nam tại các ngân hàng đang hoạt động ở các tỉnh biên giới.
#  2. Sử dụng Đồng Việt Nam trên tài khoản để thanh toán mua, bán hàng hoá, chi trả dịch vụ tại Việt Nam hoặc được liên hệ với các ngân hàng hay bàn đổi ngoại tệ tại Khu vực biên giới và Khu vực kinh tế cửa khẩu để chuyển đổi ra tiền của nước có chung biên giới để chuyển về nước.
#  Thủ tục mở và đóng tài khoản Đồng Việt Nam do các ngân hàng nơi mở tài khoản quy định. '''
# Find the row you want to update by ID (replace 'id_value' with the id of the row you want to update)
df = pd.read_sql_table('law', engine)

row_data = []
for i, row in df.iterrows(): 
    try:
        demuc_dieu_lienquan = topic_vectordb.similarity_search(row['noi_dung'], k=24)
        solanxuathien_demuc = {}

        for dieu_lienquan in demuc_dieu_lienquan:
            if dieu_lienquan.metadata["demuc_id"] in solanxuathien_demuc:
                solanxuathien_demuc[dieu_lienquan.metadata["demuc_id"]] += 1
            else:
                solanxuathien_demuc[dieu_lienquan.metadata["demuc_id"]] = 1

        demuc_xuathiennhieunhat = max(solanxuathien_demuc, key=solanxuathien_demuc.get)
        row['demuc_id'] = demuc_xuathiennhieunhat

        # Write the DataFrame back to the table
        row_data.append(row)
        
    except:
        continue
    
df_write = pd.DataFrame(row_data)
df_write.to_sql('vbpl_chuapd_v1', engine, if_exists="replace", index=False) 
