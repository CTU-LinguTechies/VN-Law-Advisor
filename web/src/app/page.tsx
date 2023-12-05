'use client';
import law from '@/assets/lottie/law.json';
import HomeNavigationCard from '@/components/home/HomeNavigationCard';
import { Col, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Fade } from 'react-awesome-reveal';
export default function Home() {
    const [animationData, setAnimationData] = useState<any>(null);
    useEffect(() => {
        import(`@/assets/lottie/law.json`).then((data) => {
            setAnimationData(data.default);
        });
    }, []);
    if (!animationData) {
        return (
            <div className="w-full p-5 flex justify-center">
                <Spin size="large"></Spin>
            </div>
        );
    }
    return (
        <>
            <Fade>
                <Row className="wavy h-[450px] w-full" justify="center" align="middle">
                    <Col span={8}>
                        <Lottie animationData={law} className="w-[450px]" />
                    </Col>
                    <Col span={10}>
                        <h1 style={{ color: 'white' }} className="text-5xl font-bold">
                            VN Law Advisor
                        </h1>
                        <p style={{ color: 'white' }} className="text-2xl italic mt-2">
                            Hệ thống hỏi đáp tri thức pháp luật Việt Nam
                        </p>
                        <ul style={{ color: 'white' }} className="mt-3">
                            <li className="italic text-xl list-disc">
                                Dựa trên mô hình ngôn ngữ lớn.
                            </li>
                            <li className="mt-1 italic text-xl list-disc">
                                Tri thức từ pháp điển Việt Nam và các VBQPPL.
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Fade>
            <main className="flex flex-col items-center justify-between my-5 p-x-24">
                <h1 className="text-3xl my-5">Nổi Bật</h1>
                <div className="">
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={4}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Hỏi đáp Pháp Luật"
                                description="Trợ lý AI giải đáp các câu hỏi về pháp luật Việt Nam."
                                icon="chatbot"
                            />
                        </Col>
                        <Col span={4}>
                            <HomeNavigationCard
                                link="/phapdien"
                                title="Tra cứu Pháp Điển"
                                description="Tra cứu Pháp Điển Việt Nam hiện hành."
                                icon="law2"
                            />
                        </Col>
                        <Col span={4}>
                            <HomeNavigationCard
                                link="/vbqppl"
                                title="Tra cứu các VBQPPL"
                                description="Tra cứu các điều luật từ VBQPPL Việt Nam."
                                icon="law"
                            />
                        </Col>
                        <Col span={4}>
                            <HomeNavigationCard
                                link="/form"
                                title="Các bảng, biểu mẫu"
                                description="Tra cứu các bảng và biểu mẫu từ VBQPPL."
                                icon="form"
                            />
                        </Col>
                        <Col span={4}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Đánh giá, góp ý"
                                description="Gửi ý kiến của bạn, cải thiện gợi ý hệ thống."
                                icon="feedback"
                            />
                        </Col>
                    </Row>
                </div>
            </main>
        </>
    );
}
