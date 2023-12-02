from bs4 import BeautifulSoup
import pandas as pd
from sqlalchemy import create_engine

# Tạo kết nối với cơ sở dữ liệu
engine = create_engine("mysql+mysqlconnector://root:root@localhost:3306/law")

# Đọc dữ liệu từ cơ sở dữ liệu
df = pd.read_sql('SELECT id, noidung FROM vbpl;', con=engine)

# Đoạn HTML cần phân tích
# with open('index.html', 'r', encoding='utf-8') as f:
#     contents = f.read()

# Tạo một đối tượng BeautifulSoup


id = 3012
chi_muc = []
id_chuong = None
for j in range(200, len(df)):
    id_vb = df.iloc[j]['id']
    contents = df.iloc[j]['noidung']
    try:
        soup = BeautifulSoup(contents, 'html.parser').find('div', id = 'toanvancontent')
        texts = [p.get_text().replace('\n', '').lstrip() for p in soup.find_all('p')]
    except:
        continue
    i = 0
    text = ''
    control = 0
    def change(text, old, new):
        if old == 1 and new == 2:
            chi_muc.append({
                'id_vb': id_vb,
                'id': id,
                'noi_dung': text,
                'chi_muc_cha': None,
            })
        if old == 2:
            chi_muc.append({
                'id_vb': id_vb,
                'id': id,
                'noi_dung': text,
                'chi_muc_cha': id_chuong,
            })

    while i < len(texts):
        if texts[i].startswith('Chương') or texts[i].startswith('CHƯƠNG'):
            if text != '':
                change(text, control, 1)
                text = ''
            id += 1
            id_chuong = id
            control = 1
        elif texts[i].startswith('Đi'):
            if text != '':
                change(text, control, 2)
                text = ''
            id += 1
            control = 2
        if control == 1:
            text += texts[i] + '\n'
        if control == 2:
            text += texts[i] + '\n'
        i += 1
    change(text, control, 2)

df_to_write = pd.DataFrame(chi_muc)
df_to_write.to_sql('vb_chimuc', con=engine, if_exists='append', index=False)
print(df_to_write)
# chi_muc {
#     id
#     id_vb
#     chi_muc_cha
#     ten
#     noi_dung
# }
