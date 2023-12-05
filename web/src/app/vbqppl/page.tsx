'use client';
import { VBQPPLModel } from '@/models/VBQPPLModel';
import vbqpplService from '@/services/vbqppl.service';
import { Card, Col, Input, Pagination, Row, Select, Tag } from 'antd';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import { Fade } from 'react-awesome-reveal';
const options = [
    {
        value: 'LUẬT',
        label: 'Luật',
    },
    {
        value: 'THÔNG TƯ',
        label: 'Thông Tư',
    },
    {
        value: 'QUYẾT ĐỊNH',
        label: 'Quyết Định',
    },
    {
        value: 'CHỈ THỊ',
        label: 'Chỉ Thị',
    },
];

const md = new MarkdownIt({ html: true });
export default function Page() {
    const [loai, setLoai] = useState('all');
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const [vanbans, setVanBans] = useState<VBQPPLModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { content, totalElements, size } = await vbqpplService.getAllVBQPPL({
                pageNo: page,
                pageSize,
                loai,
                name,
            });
            setVanBans(content);
            setTotal(Math.ceil(totalElements / size));
        };
        fetchData();
    }, [page, pageSize, loai, name]);

    return (
        <>
            <div className=" bg-gradient-to-r from-[#6B240C] to-[#994D1C] h-[500px]">
                <Fade style={{ height: '100%' }}>
                    <Row className="h-full" align="middle" justify="center">
                        <Col span={8}>
                            <Lottie
                                animationData={require('@/assets/lottie/legalDoc.json')}
                                className="w-[450px]"
                            />
                        </Col>
                        <Col span={10}>
                            <h1
                                style={{ color: 'white', lineHeight: 1.3 }}
                                className="text-5xl font-bold mt-5"
                            >
                                Danh Sách Văn Bản Quy Phạm Pháp Luật
                            </h1>
                            <p style={{ color: 'white' }} className="text-2xl italic mt-5">
                                Tập hợp các văn bản quy phạm pháp luật Việt Nam
                            </p>
                        </Col>
                    </Row>
                </Fade>
            </div>
            <main className="max-w-[1440px] w-[95%] mx-auto my-5">
                <Row>
                    <Col span={24}>
                        <h1>Xem danh sách các văn bản quy phạm pháp luật</h1>
                    </Col>
                    <Col xs={24} md={12} lg={12} xl={12} span={12}>
                        <Row className="mt-5" align="middle" gutter={[16, 16]}>
                            <Col span={12}>
                                <Select
                                    filterOption={false}
                                    className="w-full"
                                    placeholder="Tìm kiếm theo loại..."
                                    optionFilterProp="children"
                                    onChange={(value: string) => setLoai(value)}
                                    options={options}
                                    notFoundContent={
                                        <Lottie
                                            animationData={require('@/assets/lottie/empty.json')}
                                        />
                                    }
                                />
                            </Col>
                            <Col span={12}>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full"
                                    placeholder="Tìm kiếm theo tên..."
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="mt-5">
                    {vanbans.map((item) => (
                        <Col className="max-h-[300px]" span={6} sm={12} xs={24} md={12} lg={8}>
                            <Card
                                className="overflow-hidden h-full"
                                title={
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="flex justify-end">
                                            <Tag color="blue">{item.loai}</Tag>
                                        </div>
                                        <p>{item.ten}</p>
                                    </div>
                                }
                            >
                                <div dangerouslySetInnerHTML={{ __html: item.noidung }}></div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row justify="end">
                    <Col className="flex justify-end mt-5" span={24}>
                        <Pagination
                            defaultCurrent={0}
                            current={page}
                            onChange={setPage}
                            pageSizeOptions={[6, 9]}
                            pageSize={pageSize}
                            onShowSizeChange={(current, size) => {
                                setPageSize(size);
                                setPage(0);
                            }}
                            total={total}
                        />
                    </Col>
                </Row>
            </main>
        </>
    );
}
