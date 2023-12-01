import pandas as pd
from sqlalchemy import create_engine
import re
from bs4 import BeautifulSoup
import requests

# Tạo kết nối với cơ sở dữ liệu
engine = create_engine("mysql+mysqlconnector://root:root@localhost:3306/law")

# Đọc dữ liệu từ cơ sở dữ liệu
df = pd.read_sql('SELECT vbqppl_link FROM pddieu GROUP BY vbqppl_link;', con=engine)

def get_infor(url):
    if url == None:
        return None
    match = re.search(r'ItemID=(\d+).*#(.*)', url)
    if match:
        item_id = match.group(1)
        return item_id
    else:
        print('Không tìm thấy khớp.')
def save_data(list_id, list_noidung):
    # Ghi dữ liệu vào cơ sở dữ liệu từ DataFrame
    df_to_write = pd.DataFrame({
        'id': list_id,
        'noidung': list_noidung
    })
    df_to_write.to_sql('vbpl', con=engine, if_exists='append', index=False)

list_vb = [get_infor(df.iloc[i]['vbqppl_link']) for i in range(len(df))]

print(len(df))

df_vb = pd.DataFrame(list_vb)
# Loại bỏ các giá trị None
df_vb = df_vb.dropna()
# Loại bỏ các giá trị trùng nhau
df_vb = df_vb.drop_duplicates()

print(len(df_vb))
list_id = []
list_noidung = []
for i in range(len(df_vb)):
    id = df_vb.iloc[i][0]
    print(i, "Get data id ", id)
    url_content = f'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID={id}'
    try:
        response = requests.get(url_content, timeout=3)
        soup = BeautifulSoup(response.content, 'html.parser')
        div_text = soup.find_all('div', class_='fulltext')[0]
        noidung = div_text.find_all('div')[1]
        list_id.append(id)
        list_noidung.append(str(noidung))
    except:
        continue

    if i % 10 == 0:
        save_data(list_id, list_noidung)
        list_id.clear()
        list_noidung.clear()
    print("Succesfully")


save_data(list_id, list_noidung)




