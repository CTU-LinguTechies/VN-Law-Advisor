![](./docs/images/new_banner.png)

# VN-Law-Advisor

Ứng dụng hỗ trợ tra cứu, hỏi đáp tri thức pháp luật dựa trên Bộ pháp điển và CSDL văn bản QPPL Việt Nam.

Mục tiêu là phát triển một hệ thống tra cứu, hỏi đáp tri thức pháp luật Việt Nam. Dựa trên các mô hình ngôn ngữ lớn cùng với kiến trúc microservices.

Dự án được thực hiện trong cuộc thi [Phần Mềm Nguồn Mở-Olympic Tin học Sinh viên Việt Nam 2023](https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F). Được được open source theo giấy phép [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) bởi đội tác giả CTU-LinguTechnies.

Để biết thêm chi tiết về cuộc thi, bạn có thể xem tại [đây](https://vfossa.vn/tin-tuc/de-thi-phan-mem-nguon-mo-olp-2023-688.html).

## Danh Mục 🔎

1. [Giới Thiệu](#Giới-Thiệu)
2. [Chức Năng](#chức-năng-chính)
3. [Tổng Quan Hệ Thống](#tổng-quan-hệ-thống)
4. [Cấu Trúc Thư Mục](#tổng-quan-hệ-thống)
5. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
    - [Yêu Cầu - Prerequisites](#yêu-cầu)
    - [Cài Đặt](#installation-steps)
6. [CI/CD](#ci/cd)
7. [Đóng Góp](#đóng-góp-cho-dự-án)

## Giới Thiệu

-   [Pháp điển](https://vi.wikipedia.org/wiki/Ph%C3%A1p_%C4%91i%E1%BB%83n) là tập hợp các quy phạm pháp luật đang còn hiệu lực của các văn bản quy phạm pháp luật do cơ quan nhà nước ở trung ương ban hành, từ Thông tư trở lên và trừ Hiến pháp.
-   [Cơ sở dữ liệu văn bản quy phạm pháp luật Việt Nam](https://quochoi.vn/csdlth/vanbanphapluat/Pages/Home.aspx) được xây dựng từ năm 2000, bao gồm các văn bản quy phạm pháp luật từ năm 1990 đến nay. Cơ sở dữ liệu này được cập nhật thường xuyên, đảm bảo tính toàn vẹn, đầy đủ và chính xác của các văn bản quy phạm pháp luật.
-   Tuy nhiên, do việc cập nhật không thường xuyên của pháp điển so với các văn bản quy phạm pháp luật, nên pháp điển hiện tại không đảm bảo tính toàn vẹn, đầy đủ và chính xác của các văn bản quy phạm pháp luật.

## Chức Năng Chính

Project tập trung vào các chức năng chính như sau:

-   🤖 Trả lời các câu hỏi về pháp luật của người dùng.
-   🔍 Hệ thống tra cứu các pháp điển, văn bản quy phạm pháp luật: chỉ mục, liên kết các điều mục, các bảng và biểu mẫu.
-   📖 Tóm tắt văn bản, hỗ trợ người dùng trong lúc tra cứu.
-   📝 Gợi ý văn bản quy phạm pháp luật theo từ khóa tìm kiếm, nhận đóng góp để cải thiện gợi ý.

## Tổng Quan Hệ Thống 👩‍💻

Backend của hệ thống được thiết kế theo kiến trúc microservices, với các công nghệ sử dụng như sau:

-   [NextJS 14](https://nextjs.org/): Xây dựng web-app, hỗ trợ SEO, SSR, SSG.
-   [Kong API Gateway](https://konghq.com/kong/): API Gateway cho hệ thống.
-   [ExpressJS](https://expressjs.com/): Dựng API cho Auth Service.
-   [SpringBoot](https://spring.io/projects/spring-boot): Dựng API cho Law Service.
-   [Flask](https://flask.palletsprojects.com/en/2.0.x/): Dựng API cho Q&A - RAG Service.
-   [LangChain](https://www.langchain.com/): Sử dụng để truy vấn các context là tri thức luật.
-   [MySQL](https://www.mysql.com/): Cơ sở dữ liệu quan hệ.
-   [Redis](https://redis.io/): Cơ sở dữ liệu NoSQL in-memory dạng key-value.
-   [ChromaDB](https://www.trychroma.com/): Cơ sở dữ liệu embedding dạng vector.
-   [RabbitMQ](https://www.rabbitmq.com/): Message broker cho hệ thống.
-   [Docker](https://www.docker.com/): Containerize các service.
-   [Docker Compose](https://docs.docker.com/compose/): Quản lý các container.
-   [Prometheus](https://prometheus.io/): Monitor các metrics.
-   [Grafana](https://grafana.com/): WebUI hiển thị metrics.

<img loading="lazy" src="./docs/images/system_architecture.svg" alt="Architecture" width="100%" height=600>

## Cấu trúc thư mục

-   [Crawler](./law-crawler) - Crawl vào CSDL từ nguồn pháp điển Việt Nam.
-   [Backend](./backend) - Chứa các mô hình, services, kiến trúc của hệ thống.
-   [Web](./web) - Giao diện người dùng.
-   [Documents](./docs/) - Tài liệu về dự án.

## Hướng Dẫn Cài Đặt

### Yêu Cầu 📋

Để cài đặt và chạy được dự án, trước tiên bạn cần phải cài đặt các công cụ bên dưới. Hãy thực hiện theo các hướng dẫn cài đặt sau, lưu ý chọn hệ điều hành phù hợp với máy tính của bạn:

-   [Docker-Installation](https://docs.docker.com/get-docker/)
-   [Docker-Compose-Installation](https://docs.docker.com/compose/install/)
-   [NodeJS v18-Installation](https://nodejs.org/en/download/)

> **Lưu ý:** NextJS 14 chỉ tương thích với NodeJS 18 từ 18 trở lên.

### Cài Đặt 🔨

Trước hết, hãy clone dự án về máy tính của bạn:

```bash
git clone https://github.com/CTU-LinguTechies/VN-Law-Advisor.git vnlawadvisor
```

cd vào thư mục vnlawadvisor:

```bash
cd vnlawadvisor
```

#### Chạy crawler lấy dữ liệu pháp điển và các van bản quy phạm pháp luật (optional):

Bước này chỉ cần chạy một lần duy nhất để lấy dữ liệu pháp điển và các văn bản quy phạm pháp luật vào cơ sở dữ liệu MySQL. Nếu bạn đã có dữ liệu, bạn có thể bỏ qua bước này và tự import vào hệ thống với hướng dẫn phía dưới.

Để cào dữ liệu, hãy:

```bash
cd law-crawler
```

Và tiếp tục theo hướng dẫn trong thư mục law-crawler [README.md](./law-crawler/README.md).

## Đóng góp cho dự án 🙌

Nếu bạn muốn đóng góp cho dự án, hãy đọc [CONTRIBUTING.md](./CONTRIBUTING.md) để biết thêm chi tiết.

Mọi đóng góp của các bạn đều được trân trọng, đừng ngần ngại gửi pull request cho dự án.
