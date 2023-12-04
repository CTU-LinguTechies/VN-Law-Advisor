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

## Hệ thống

Thiết kế theo kiến trúc microservices như hình vẽ bên dưới:

![Kiến trúc hệ thống](../docs/images/system_architecture.svg)

### KONG API Gateway

-   Kong API Gateway: Sử dụng Kong API Gateway làm entrypoint cho hệ thống.
    -   Các request từ client sẽ được route đến các service tương ứng thông qua Kong.
    -   Sử dụng một Load Balancer Plugin để cân bằng tải giữa các services.
    -   Sử dụng Rate Limiting Plugin để giới hạn số request tối đa mà một client có thể gửi trong một khoảng thời gian nhất định.
    -   Sử dụng Proxy Cache Plugin để cache response từ các service.

### Auth Service

-   Auth Service: Service xử lý việc đăng nhập, đăng ký, đăng xuất, xác thực người dùng.
    -   Sử dụng JWT để phân quyền. Dùng access token và refresh token.
    -   Sử dụng Redis để lưu trữ refresh token.
    -   Sử dụng MySQL để lưu trữ thông tin người dùng.

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
