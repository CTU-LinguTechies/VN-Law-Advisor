'use client';
import FormListSearch from '@/components/form/FormListSearch';
import { Col, Row } from 'antd';
import FormList from 'antd/es/form/FormList';
import Lottie from 'lottie-react';
import { Fade } from 'react-awesome-reveal';

export default function FormPage() {
    return (
        <main>
            <div className=" bg-gradient-to-r from-blue-500 to-indigo-500 h-[500px]">
                <Fade style={{ height: '100%' }}>
                    <Row className="h-full" align="middle" justify="center">
                        <Col span={8}>
                            <Lottie
                                animationData={require('@/assets/lottie/registration.json')}
                                className="w-[450px]"
                            />
                        </Col>
                        <Col span={10}>
                            <h1 style={{ color: 'white' }} className="text-5xl font-bold">
                                Các Bảng Và Biểu Mẫu
                            </h1>
                            <p style={{ color: 'white' }} className="text-2xl italic mt-5">
                                Tra cứu các bảng và biểu mẫu pháp luật Việt Nam từ pháp điển và các
                                văn bản quy phạm pháp luật.
                            </p>
                        </Col>
                    </Row>
                </Fade>
            </div>
            <div className="max-w-[1440px] w-[95%] mx-auto my-5">
                <FormListSearch />
            </div>
        </main>
    );
}
