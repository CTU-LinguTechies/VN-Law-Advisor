![](https://raw.githubusercontent.com/CTU-LinguTechies/VN-Law-Advisor/4d118a0e2bf5ae7a3ab8a110427e416cbc700628/docs/images/new_banner.png)

# VN-Law-Advisor

[![Github license](https://img.shields.io/github/license/CTU-LinguTechies/VN-Law-Advisor.svg 'Github license')](https://github.com/CTU-LinguTechies/VN-Law-Advisor/blob/master/LICENSE)
[![Open issues](https://img.shields.io/github/issues/CTU-LinguTechies/VN-Law-Advisor.svg 'Open issues')](https://github.com/CTU-LinguTechies/VN-Law-Advisor/issues)
[![Open Pull Requests](https://img.shields.io/github/issues-pr/CTU-LinguTechies/VN-Law-Advisor.svg 'Open Pull Requests')](https://github.com/CTU-LinguTechies/VN-Law-Advisor/pulls)
[![Commit activity](https://img.shields.io/github/commit-activity/m/CTU-LinguTechies/VN-Law-Advisor.svg 'Commit activity')](https://github.com/CTU-LinguTechies/VN-Law-Advisor/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/CTU-LinguTechies/VN-Law-Advisor.svg 'Github contributors')](https://github.com/CTU-LinguTechies/VN-Law-Advisor/graphs/contributors)

<a href="https://github.com/CTU-LinguTechies/VN-Law-Advisor/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Bug Report ⚠️
</a>

<a href="https://github.com/CTU-LinguTechies/VN-Law-Advisor/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=%F0%9F%90%9B+Bug+Report%3A+">Request Feature 👩‍💻</a>

Ứng dụng hỗ trợ tra cứu, hỏi đáp tri thức pháp luật dựa trên Bộ pháp điển và CSDL văn bản QPPL Việt Nam.

Mục tiêu là phát triển một hệ thống tra cứu, hỏi đáp tri thức pháp luật Việt Nam. Dựa trên các mô hình ngôn ngữ lớn cùng với kiến trúc microservices.

Dự án được thực hiện trong cuộc thi [Phần Mềm Nguồn Mở-Olympic Tin học Sinh viên Việt Nam 2023](https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F). Được được open source theo giấy phép [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) bởi đội tác giả CTU-LinguTechnies.

Để biết thêm chi tiết về cuộc thi, bạn có thể xem tại [đây](https://vfossa.vn/tin-tuc/de-thi-phan-mem-nguon-mo-olp-2023-688.html).

## 🔎 Danh Mục

1. [Giới Thiệu](#Giới-Thiệu)
2. [Chức Năng](#chức-năng-chính)
3. [Tổng Quan Hệ Thống](#👩‍💻-tổng-quan-hệ-thống)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
    - [📋 Yêu Cầu - Prerequisites](#yêu-cầu-📋)
    - [🔨 Cài Đặt](#🔨-cài-đặt)
6. [CI/CD](#ci/cd)
7. [🙌 Đóng Góp](#🙌-đóng-góp-cho-dự-án)
8. [📝 License](#📝-license)

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
