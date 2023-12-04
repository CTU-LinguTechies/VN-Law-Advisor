## Crawler

Chạy module này để cào dữ liệu pháp luật từ [Pháp Điển Việt Nam](https://phapdien.moj.gov.vn/) và [Văn bản quy phạm pháp luật](https://vbpl.vn/). Bước này là optional cho hệ thống, bạn có thể bỏ qua nếu không cần dữ liệu ban đầu.

Lấy dữ liệu từ [Pháp Điển Việt Nam](https://phapdien.moj.gov.vn/), tải file zip và giải nén vào thư mục này.

### Cào dữ liệu pháp điển

-   Tạo 2 file json từ file jsonData.json gốc:
    -   chude.json: chứa các chủ đề
    -   demuc.json: chứa các đề mục
    -   treeNode: chứa các node là các Phần, Chương, Mục, Tiểu mục, Điều.
-   Cuối cùng thư mục của bạn sẽ có cấu trúc như sau:

```
phap-dien
├── chude.json
├── demuc.json
├── treeNode.json
├── demuc/
│   ├── 1/...
│   ├── 2/...
```

-   Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

-   Chạy MySQL và PHPMyAdmin containers từ docker-compose:

```bash
docker-compose up -d
```

-   Chạy crawler:

```bash
python main.py
```

Sau khi chạy xong, dữ liệu sẽ được lưu vào DB, bạn có thể export ra bằng PHPAdmin dưới dạng .sql để dùng lại.

### Cào dữ liệu văn bản quy phạm pháp luật

-   Chạy MySQL và PHPMyAdmin containers từ docker-compose:

```bash
docker-compose up -d
```

-   Tiếp tục từ thư mục ở bước trên, cd vào thư mục này:

```bash
cd document-crawler
```

-   Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

-   Chạy crawler:

```bash
python main.py
```

-   Phân chia VBQPPL thành các điều

```bash
python split_document.py
```

Sau khi chạy xong, dữ liệu VBQPPL và các điều sẽ được lưu vào DB, bạn có thể export ra bằng PHPAdmin dưới dạng .sql để dùng lại.
