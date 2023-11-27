import { Lottie } from '.';
import law from '@/assets/lottie/law.json';
import { Col, Row } from 'antd';

export default function Home() {
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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div></div>
                <Row justify="center">
                    <Col span={8}></Col>
                </Row>
            </main>
        </>
    );
}
