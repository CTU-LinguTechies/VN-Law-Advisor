'use client';
import law from '@/assets/lottie/law.json';
import HomeNavigationCard from '@/components/home/HomeNavigationCard';
import { Col, Row, Skeleton, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
export default function Home() {
    const [animationData, setAnimationData] = useState<any>(null);
    useEffect(() => {
        import(`@/assets/lottie/law.json`).then((data) => {
            setAnimationData(data.default);
        });
    }, []);
    if (!animationData) {
        return <Spin />;
    }
    return (
        <>
            <div>
                <Row className="wavy h-[450px] w-full" justify="center" align="middle">
                    <Col span={8}>
                        <Lottie animationData={law} className="w-[450px]" />
                    </Col>
                    <Col span={10}>
                        <h1 className="text-5xl font-bold">VN Law Advisor</h1>
                        <p className="text-2xl italic mt-2">
                            Hệ thống hỏi đáp tri thức pháp luật Việt Nam
                        </p>
                        <ul className="mt-3">
                            <li className="italic text-lg list-disc">
                                Dựa trên mô hình ngôn ngữ lớn.
                            </li>
                            <li className="mt-1 italic text-lg list-disc">
                                Tri thức từ pháp điển Việt Nam và các VBQPPL.
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <main className="flex flex-col items-center justify-between mt-5 p-x-24">
                <h1 className="text-3xl">Nổi Bật</h1>
                <div className="max-w-[80%]">
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={6}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Hỏi đáp Pháp Luật"
                                description="Trợ lý AI giải đáp các câu hỏi về pháp luật Việt Nam."
                                icon="chatbot"
                            />
                        </Col>
                        <Col span={6}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Tra cứu Pháp Luật"
                                description="Tra cứu các điều luật từ pháp điển và VBQPPL Việt Nam."
                                icon="law2"
                            />
                        </Col>
                        <Col span={6}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Các bảng, biểu mẫu"
                                description="Tra cứu các bảng và biểu mẫu từ VBQPPL."
                                icon="form"
                            />
                        </Col>
                        <Col span={6}>
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
