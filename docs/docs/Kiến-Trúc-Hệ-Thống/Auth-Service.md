---
weight: 3
---

# Dịch vụ xác thực và phân quyền

> Dịch vụ xác thực và phân quyền với các chức năng như đăng nhập, đăng ký và kiểm soát truy cập. Có thể phát triển như một ứng dụng đơn giản hay một dịch vụ microservice. Sử dụng các thư viện và framework như Node.js, Express, JWT, Redis, MySQL,...

## Kiến trúc

![](https://miro.medium.com/max/788/1*XkmnsJ6Joa6EDFVGUw0tfA.png)

## Các công nghệ sử dụng chính

1.  NodeJS
2.  Express
3.  EJS
4.  MySQL
5.  Redis
6.  Sequenlize

## Yêu cầu

-   Redis
-   NodeJS
-   MySQL
-   Docker

## Cài đặt trên thiết bị mặc định

##### Chuyển sang thưc mục chứa service

`cd auth-service`

##### Cài đặt NPM dependencies

`npm install`

##### Cuối cùng khởi động ứng dụng

`npm start`

#### Dịch vụ sẽ chạy tại app http://localhost:8000/

## Cài đặt trên docker

##### Chuyển sang thưc mục chứa service

`cd auth-service`

##### Dựng docker image

`docker build -t auth-service-image:tag .`

##### Dựng docker image

`docker run -d -p 8000:8000 --name auth-service auth-service-image:tag`

## Kiểm thử

`npm test`

Mô tả: Sử dụng thư viện Jest và SuperJest để kiểm thử các api như đăng ký, đăng nhập, yêu cầu token.

## Cấu trúc service

<pre> 
auth-service
|-- Dockerfile      
|-- README.md       
|-- __test__        
|   `-- auth.test.js
|-- app.js
|-- bin
|   `-- www
|-- config
|   |-- CustomError.js
|   |-- constants
|   |   `-- index.js
|   `-- index.js
|-- controllers
|   `-- AuthController.js
|-- jest.config.js
|-- models
|   `-- User.js
|-- node_modules
|-- package-lock.json
|-- package.json
|-- routes
|   `-- index.js
`-- services
    |-- CommonUtils.js
    |-- dbSync.js
    |-- jwtService.js
    |-- passwordService.js
    |-- redisService.js
    `-- sequelizeService.js
</pre>
