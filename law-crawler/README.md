## Crawler

Lấy dữ liệu từ [Pháp Điển Việt Nam](https://phapdien.moj.gov.vn/), tải file zip và giải nén vào thư mục này.

### Cào dữ liệu

-   Đầu tiên, cd vào thư mục này:

```bash
cd law-crawler
```

-   Tạo 2 file json từ file jsonData.json gốc:
    -   chude.json: chứa các chủ đề
    -   demuc.json: chứa các đề mục
    -   treeNode: chứa các node là các Phần, Chương, Mục, Tiểu mục, Điều.
-   Cuối cùng thư mục của bạn sẽ có cấu trúc như sau:

```
law-crawler
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
