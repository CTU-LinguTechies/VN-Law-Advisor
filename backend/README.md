## Backend

-   Toàn bộ mã nguồn backend sẽ nằm ở thư mục này
-   Cấu trúc thư mục backend hiện tại như sau:

```
backend
├── rag/
├── api-gateway/
├── system/
│   ├── 1/auth-service
│   ├── 2/law-service
```

-   Thư mục [rag](./rag) chứa hệ thống RAG (Retrieval-Augmented Generation) dùng để retrieve các điều mục, tri thức pháp luật có liên quan đến câu hỏi của người dùng. Từ context đó sẽ đi qua một mô hình ngôn ngữ để sinh ra câu trả lời.
-   [api-gateway](./api-gateway): API Gateway cho hệ thống
-   Thư mục system chứa các services của hệ thống:
    -   [auth-service](./system/auth-service): service xác thực người dùng
    -   [law-service](./system/law-service): service chứa các API quản lý dữ liệu pháp điển, văn bản quy phạm pháp luật.

## Pre-requisites - Yêu cầu

-   Cần có các công cụ sau để cài đặt và chạy một local server:
    -   [Docker](https://docs.docker.com/get-docker/)
    -   [Docker Compose](https://docs.docker.com/compose/install/)

## Hướng dẫn cài đặt

-   cd vào thư mục backend:

```bash
cd backend
```

-   Chạy docker-compose.yaml:

```bash
docker-compose up -d
```

-   Sau khi chạy xong, các service sẽ được chạy trên các port như sau:
    -   auth-service: 8000
    -   law-service: 8001
    -   rag: 8002
