# Service để lấy các điều trong các Văn bản Quy phạm Pháp Luật và các Văn bản Quy phạm Pháp Luật liên quan đến từ khóa

Đây sẽ là hướng dẫn để giúp bạn khởi chạy Service nằm trong thư mục `/recommendation/`.

### Cài đặt các thư viện cần thiết
Để cài đặt các thư viện cần thiết, hãy chạy câu lệnh bên dưới:
```bash
pip install -r requirements.txt
```
### Khởi chạy dịch vụ và các mô hình Transformers từ HuggingFace🤗

1. **Chỉ định các mô hình Vector hóa dữ liệu**
Chỉ định mô hình `Sentence-Transformers` từ HuggingFace🤗.
Thêm tên mô hình hoặc địa chỉ vào `ST_MODEL_PATH` trong tập tin `.ENV`.

2. **Thêm đường dẫn đến thư mục Cơ sở dữ liệu Vector**
Thêm địa chỉ đến Cơ sở dữ liệu Vector vào `TEXT_DB_PATH` trong tập tin `.ENV`.

3. **Khởi động dịch vụ**
Khởi động dịch vụ với câu lệnh sau:

```bash
python get_recommendations.py
```
hoặc

```bash
python3 get_recommendations.py
```
