# Service để lấy các điều trong đề mục và đưa ra câu trả lời

Đây sẽ là hướng dẫn để giúp bạn khởi chạy Service nằm trong thư mục `/rag/`.

### Cài đặt các thư viện cần thiết
Để cài đặt các thư viện cần thiết, hãy chạy câu lệnh bên dưới:
```bash
pip install -r requirements.txt
```
### Khởi chạy dịch vụ và các mô hình Transformers từ HuggingFace🤗

1. **Chỉ định các mô hình Vector hóa dữ liệu**
Chỉ định mô hình `Sentence-Transformers` từ HuggingFace🤗.
Thêm tên mô hình hoặc địa chỉ vào `ST_MODEL_PATH` trong tập tin `.ENV`.

2. **Chỉ định các mô hình sinh câu trả lời**
Chỉ định mô hình có thể sinh câu trả lời từ HuggingFace🤗. Ví dụ như: BERTforQuestionAnswering, T5, Chat-Llama2 hay PhoGPT
Thêm tên mô hình hoặc địa chỉ vào `QA_MODEL_PATH` trong tập tin `.ENV`.

3. **Thêm đường dẫn đến thư mục Cơ sở dữ liệu Vector**
Thêm địa chỉ đến Cơ sở dữ liệu Vector vào `TOPIC_DB_PATH` trong tập tin `.ENV`.

4. **Khởi động dịch vụ**
Khởi động dịch vụ với câu lệnh sau:

```bash
python get_response.py
```
hoặc
```bash
python3 get_response.py
```
