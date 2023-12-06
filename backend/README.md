## Backend

-   Toàn bộ mã nguồn backend sẽ nằm ở thư mục này
-   Cấu trúc thư mục backend hiện tại như sau:

```
backend
├── rag/
├── api-gateway/
├── auth-service/
├── law-service/
├── recommendation/
```

-   Thư mục [rag](./rag) chứa hệ thống RAG (Retrieval-Augmented Generation) dùng để retrieve các điều mục, tri thức pháp luật có liên quan đến câu hỏi của người dùng. Từ context đó sẽ đi qua một mô hình ngôn ngữ để sinh ra câu trả lời.
-   [api-gateway](./api-gateway): API Gateway cho hệ thống
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

### Law Service

-   Law Service: Service quản lý các dữ liệu về pháp điển, chỉ mục các bảng-biểu mẫu và các văn bản quy phạm pháp luật.
    -   Sử dụng MySQL để lưu trữ dữ liệu.
    -   Sử dụng Redis để cache dữ liệu thường yêu cầu.
    -   Sử dụng SpringBoot
    -   Sử dụng RabbitMQ để cập nhật embedding.

### RAG Service

-   RAG Service: Service xử lý các câu hỏi của người dùng.
    -   Sử dụng Flask để xây dựng API.
    -   Sử dụng LangChain để truy vấn các context là tri thức luật.
    -   Sử dụng ChromaDB để truy vấn các context là embedding.

### Recommendation Service

-   Recommendation Service: Thực hiện việc gợi ý các văn bản pháp luật có liên quan, cấu trúc hóa vbqppl và search theo từ khóa.
    -   Sử dụng Flask để xây dựng API.
    -   Sử dụng LangChain để truy vấn các context là tri thức luật.
    -   Sử dụng ChromaDB để truy vấn các context là embedding.

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

## PORT BINDING

-   Sau khi chạy xong, các service sẽ được chạy trên các port như sau:
<table width="100%">
<thead>
<th>
Service
</th>
<th>
PORT
</th>
</thead>
<tbody>
<tr>
<td>API Gateway</td>
<td>

8000:8000

8001:8001

8002:8002

8003:8003

8004:8004

</td>

</tr>
<tr>
<td>Auth Service</td>
<td>5000:5000</td>
</tr>
<tr>
<td>Law Service</td>
<td>8080:8080</td>
</tr>
<tr>
<td>RAG Service</td>
<td>5001:5001</td>
</tr>
<tr>
<td>Recommendation Service</td>
<td>5002:5002</td>
</tr>
</tbody>
</table>
