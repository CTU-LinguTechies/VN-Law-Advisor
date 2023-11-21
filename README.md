# VN-Law-Advisor

Ứng dụng hỗ trợ tra cứu, hỏi đáp tri thức pháp luật dựa trên Bộ pháp điển và CSDL văn bản QPPL Việt Nam.

Mục tiêu là phát triển một hệ thống tra cứu, hỏi đáp tri thức pháp luật Việt Nam. Dựa trên các mô hình ngôn ngữ lớn cùng với kiến trúc microservices.

Dự án được thực hiện trong cuộc thi [Phần Mềm Nguồn Mở-Olympic Tin học Sinh viên Việt Nam 2023](https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F). Được được open source theo giấy phép [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) bởi đội tác giả CTU-LinguTechnies.

## Chức năng chính

Project tập trung vào các chức năng chính như sau:

-   Trả lời các câu hỏi về pháp luật của người dùng.
-   Hệ thống tra cứu các pháp điển, văn bản quy phạm pháp luật (chỉ mục, liên kết các điều mục).
-   Tóm tắt văn bản, hỗ trợ người dùng trong lúc tra cứu
-   Mô hình gợi ý các điều mục có liên quan trong pháp điển, nhận feedback từ người dùng để cải thiện gợi ý

## Getting Started - Hướng Dẫn

-   [Crawler](./law-crawler/README.md) - Crawl vào CSDL từ nguồn pháp điển Việt Nam.
-   [Backend](./backend/README.md) - Chứa các mô hình, services, API Gateway cho hệ thống
-   [Web](./web/README.md) - Giao diện người dùng

## Contributing - Đóng góp cho dự án

Nếu bạn muốn đóng góp cho dự án, hãy đọc [CONTRIBUTING.md](./CONTRIBUTING.md) để biết thêm chi tiết.

Mọi đóng góp của các bạn đều được trân trọng, đừng ngần ngại gửi pull request cho dự án.
