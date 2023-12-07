'use client';
import law from '@/assets/lottie/law.json';
import HomeNavigationCard from '@/components/home/HomeNavigationCard';
import { Col, Input, Row, Spin } from 'antd';
const { Search } = Input;
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Fade } from 'react-awesome-reveal';
import vbqpplService from '@/services/vbqppl.service';
export default function Home() {
    const [animationData, setAnimationData] = useState<any>(null);
    const [searchResult, setSearchResult] = useState<any[]>([]);
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

    const search = async (value: string) => {
        const result: any = await vbqpplService.getReccomended({
            keyword: value,
            num_of_relevant_texts: 7,
        });

        for (const id of result.ids) {
            const vb = await vbqpplService.getOne(id);
            console.log(vb);
        }

        setSearchResult(result);
    };
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
                <div>
                    <Row justify="start">
                        <Col span={24}>
                            <h1 style={{ margin: '16px 0' }}>Tìm văn bản pháp luật bằng từ khóa</h1>

                            <Search
                                placeholder="Tìm một từ khóa..."
                                onSearch={search}
                                enterButton
                            />
                        </Col>
                        <Col span={24}></Col>
                    </Row>
                </div>
                <h1 className="text-3xl my-5">Nổi Bật</h1>
                <div className="">
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={4} lg={4} md={6} sm={8} xs={24}>
                            <HomeNavigationCard
                                link="/chat"
                                title="Hỏi đáp Pháp Luật"
                                description="Trợ lý AI giải đáp các câu hỏi về pháp luật Việt Nam."
                                icon="chatbot"
                            />
                        </Col>
                        <Col span={4} lg={4} md={6} sm={8} xs={24}>
                            <HomeNavigationCard
                                link="/phapdien"
                                title="Tra cứu Pháp Điển"
                                description="Tra cứu Pháp Điển Việt Nam hiện hành."
                                icon="law2"
                            />
                        </Col>
                        <Col span={4} lg={4} md={6} sm={8} xs={24}>
                            <HomeNavigationCard
                                link="/vbqppl"
                                title="Tra cứu các VBQPPL"
                                description="Tra cứu các điều luật từ VBQPPL Việt Nam."
                                icon="law"
                            />
                        </Col>
                        <Col span={4} lg={4} md={6} sm={8} xs={24}>
                            <HomeNavigationCard
                                link="/form"
                                title="Các bảng, biểu mẫu"
                                description="Tra cứu các bảng và biểu mẫu từ VBQPPL."
                                icon="form"
                            />
                        </Col>
                        <Col span={4} lg={4} md={6} sm={8} xs={24}>
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
