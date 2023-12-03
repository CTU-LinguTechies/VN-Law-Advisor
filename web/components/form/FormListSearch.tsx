'use client';
import { DeMucModel } from '@/models/DeMucModel';
import pddemucService, { PDDemucGetAllFilter } from '@/services/pddemuc.service';
import { Col, Row, Select, Input, Divider, Pagination, Card, Button, Carousel } from 'antd';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import useDelay from '@/hooks/useDelay';
import pddieuService from '@/services/pddieu.service';
import { PureDieuModel } from '@/models/DieuModel';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default function FormListSearch() {
    const [demucOptions, setDemucOptions] = useState<DeMucModel[]>([]);
    const [selectedDemuc, setSelectedDemuc] = useState<string | undefined>(undefined);
    const [name, setName] = useState('');
    const [dieuOptions, setDieuOptions] = useState<PureDieuModel[]>([]);
    const [autoAnimateParent] = useAutoAnimate();

    const keyword = useDelay({ keyword: name, delay: 500 });

    useEffect(() => {
        async function fetchDieuData() {
            const { content } = await pddieuService.getFilter({
                deMucId: selectedDemuc,
                name: keyword,
            });
            setDieuOptions(content);
        }
        fetchDieuData();
    }, [selectedDemuc, keyword]);

    useEffect(() => {
        async function fetchData() {
            const { content } = await pddemucService.getAll();
            setDemucOptions(content);
        }
        fetchData();
    }, []);

    const onSearch = async (value: string) => {
        const { content } = await pddemucService.getAll({ name: value } as PDDemucGetAllFilter);
        setDemucOptions(content);
    };
    return (
        <div>
            <h1>Xem các bảng và biểu mẫu theo chỉ mục</h1>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={12} xl={12} span={12}>
                    <Row className="mt-5" align="middle" gutter={[16, 16]}>
                        <Col span={12}>
                            <Select
                                filterOption={false}
                                className="w-full"
                                showSearch
                                placeholder="Tìm kiếm theo đề mục..."
                                optionFilterProp="children"
                                onChange={(value: any) => setSelectedDemuc(value)}
                                onSearch={onSearch}
                                options={demucOptions.map((item: DeMucModel) => ({
                                    label: item.ten,
                                    value: item.id,
                                }))}
                                notFoundContent={
                                    <Lottie animationData={require('@/assets/lottie/empty.json')} />
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
                    <Row justify="center">
                        <Col span={24}>
                            {dieuOptions.length === 0 ? (
                                <div className="flex items-center flex-col">
                                    <Lottie
                                        style={{ width: 350 }}
                                        animationData={require('@/assets/lottie/empty.json')}
                                    />
                                    <h4 style={{ fontWeight: 400 }} className="text-2xl italic">
                                        Hãy tìm một chỉ mục để xem
                                    </h4>
                                </div>
                            ) : (
                                <Row
                                    className="mt-5"
                                    justify="center"
                                    gutter={[16, 16]}
                                    ref={autoAnimateParent}
                                >
                                    {dieuOptions.map((item: PureDieuModel) => (
                                        <Col key={item.mapc} span={10}>
                                            <Card title={item.ten}>
                                                <p
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {item.noidung}
                                                </p>
                                                <Button>
                                                    <Link href={`/phapdien?id=${item.mapc}`}>
                                                        Đọc thêm
                                                    </Link>
                                                </Button>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Col>
                        <Col className="flex justify-center mt-5" span={24}>
                            <Pagination defaultCurrent={1} total={50} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} md={12} lg={12} xl={12} span={12}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </div>
    );
}
